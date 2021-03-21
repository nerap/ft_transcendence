class ChatroomsController < ApplicationController
    respond_to :html, :json
    before_action :authenticate_user!
    before_action :load_entities
    before_action :check_permission, only: [:show]
    before_action { flash.clear }

    def index
        @chatrooms = Chatroom.all.order(:name)
    end

    def new
        @chatroom = Chatroom.new
    end

    def create
        @chatroom = Chatroom.new permitted_parameters
        if @chatroom.chatroom_type == "public"
            @chatroom.password = nil
        end
        if @chatroom.save
            flash[:notice] = "#{@chatroom.name} was created successfully"
            respond_with(@chatroom)
        else
            respond_with(@chatroom, status: :unprocessable_entity)
        end
    end

    def edit
        render :unauthorized, status: :forbidden if (current_user.id != @chatroom.owner)
    end

    def update
        @chatroom = Chatroom.find(params[:id])
        if (current_user.id == @chatroom.owner)
            if @chatroom.update(permitted_parameters)
                flash[:notice] = "#{@chatroom.name} was updated successfully"
                redirect_to @chatroom
            else
                render :new
            end
        else
            render :new, status: :forbidden
        end
    end

    def show
        @chatroom = Chatroom.find(params[:id])
        @chatroom_owner = User.find(@chatroom.owner)
        @userid = current_user.id
        @roomid = @chatroom.id
        @chat = Chat.new chatroom: @chatroom
        @chats = @chatroom.chat.includes(:user)
    end

    def destroy
        if @chatroom.owner == current_user.id
            @chatroom.destroy
            flash[:deleted] = "#{@chatroom.name} was deleted successfully"
            redirect_to chatrooms_path
        else
            render :unauthorized, status: :forbidden
        end
    end

    def login
        chatroom_id = params[:chatroom][:chatroom_id]
        chatroom = Chatroom.find(chatroom_id)
        if params[:chatroom][:chatroom_password] == chatroom.password
            chatroom.members.push(current_user.id)
            respond_to do |format|
                if chatroom.save
                    flash[:notice] = "You are now a member of #{@chatroom.name} !"
                    ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                    ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                    format.json { render json: { chatroom: @chatroom }, status: :ok }
                end
            end
        else
            respond_to do |format|
                flash[:error] = "Wrong password !"
                ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                format.json { render json: { chatroom: @chatroom }, status: :unprocessable_entity }
            end
        end
    end

    def set_admin
        chatroom = Chatroom.find(params[:id])
        user = params[:chatroom][:userid].to_i
        if User.find_by_id(user) && current_user.id == chatroom.owner && chatroom.members.detect{ |e| e == user } && !chatroom.admin.detect{ |e| e == user }
            chatroom.admin.push(user)
            respond_to do |format|
                if chatroom.save
                    ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                    ActionCable.server.broadcast "flash_admin_channel:#{user}", chatroom: @chatroom, user: user, type: "admin"
                    format.json { render json: { chatroom: chatroom }, status: :ok }
                end
            end
        end
    end

    def unset_admin
        chatroom = Chatroom.find(params[:id])
        if current_user.id == chatroom.owner
            user = params[:chatroom][:userid].to_i
            chatroom.admin.delete(user)
            respond_to do |format|
                if chatroom.save
                    flash[:deleted] = "You have been demoted as member in #{@chatroom.name} !"
                    ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                    ActionCable.server.broadcast "flash_admin_channel:#{user}", type: "flash", flash: flash
                    format.json { render json: { chatroom: chatroom }, status: :ok }
                end
            end
        end
    end

    def ban_user
        chatroom = Chatroom.find(params[:id])
        if (current_user.id == chatroom.owner || chatroom.admin.detect{ |e| e == current_user.id })
            user = params[:chatroom][:userid].to_i
            chatroom.banned.push(user)
            if chatroom.admin.detect{ |e| e == user }
                chatroom.admin.delete(user)
            end
            if chatroom.members.detect{ |e| e == user }
                chatroom.members.delete(user)
            end
            respond_to do |format|
                if chatroom.save
                    ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                    ActionCable.server.broadcast "flash_admin_channel:#{user}", chatroom: @chatroom, user: user, type: "ban"
                    format.json { render json: { chatroom: chatroom }, status: :ok }
                end
            end
        end
    end

    def unban_user
        chatroom = Chatroom.find(params[:id])
        if (current_user.id == chatroom.owner || chatroom.admin.detect{ |e| e == current_user.id })
            user = params[:chatroom][:userid].to_i
            chatroom.banned.delete(user)
            respond_to do |format|
                if chatroom.save
                    flash[:notice] = "You have been unbanned from #{@chatroom.name} !"
                    ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                    ActionCable.server.broadcast "flash_admin_channel:#{user}", type: "flash", flash: flash
                    format.json { render json: { chatroom: chatroom }, status: :ok }
                end
            end
        end
    end

    def new_owner
        return render :unauthorized, status: :forbidden if current_user.id != @chatroom.owner
        if (current_user.id == @chatroom.owner && (newowner = User.where(username: params[:chatroom][:owner]).first))
            @chatroom.owner = newowner.id
            if @chatroom.admin.detect{ |e| e == newowner.id }
                @chatroom.admin.delete(newowner.id)
            end
            if @chatroom.save
                ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                ActionCable.server.broadcast 'flash_admin_channel', chatroom: @chatroom, user: newowner.id, type: "owner"
                redirect_to @chatroom
            end
        end
    end

    def join
        if @chatroom.chatroom_type == "public"
            if !@chatroom.members.detect{ |e| e == current_user.id } && current_user.id != @chatroom.owner && !@chatroom.banned.detect{ |e| e == current_user.id }
                @chatroom.members.push(current_user.id)
                respond_to do |format|
                    if @chatroom.save
                        flash[:notice] = "You are now a member of #{@chatroom.name} !"
                        ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                        ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                        format.json { render json: { chatroom: @chatroom }, status: :ok }
                    end
                end
            elsif @chatroom.banned.detect{ |e| e == current_user.id }
                respond_to do |format|
                    flash[:error] = "You are banned from #{@chatroom.name} !"
                    ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                    format.json { render json: { chatroom: @chatroom }, status: :forbidden }
                end
            end
        end
    end

    def unjoin
        if @chatroom.members.detect{ |e| e == current_user.id } && current_user.id != @chatroom.owner
            @chatroom.members.delete(current_user.id)
            if @chatroom.admin.detect{ |e| e == current_user.id }
                @chatroom.admin.delete(current_user.id)
            end
            respond_to do |format|
                if @chatroom.save
                    flash[:deleted] = "You are no longer a member of #{@chatroom.name} !"
                    ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                    ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                    format.json { render json: { chatroom: @chatroom }, status: :ok }
                end
            end
        elsif current_user.id == @chatroom.owner
            respond_to do |format|
                flash[:error] = "You are the owner of #{@chatroom.name} !"
                ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                format.json { render json: { chatroom: @chatroom }, status: :unprocessable_entity }
            end
        end
    end

    protected
    def load_entities
        @chatrooms = Chatroom.all.order(:name)
        @chatroom = Chatroom.find(params[:id]) if params[:id]
    end

    def permitted_parameters
        params.require(:chatroom).permit(:name, :chatroom_type, :password, :owner)
    end

    def check_permission
        @chatroom = Chatroom.find(params[:id]) if params[:id]
        if @chatroom.banned.detect{ |e| e == current_user.id } || (!@chatroom.members.detect{ |e| e == current_user.id } && current_user.id != @chatroom.owner)
            flash[:error] = "You are not a member of this chatroom!" if (!@chatroom.members.detect{ |e| e == current_user.id } && current_user.id != @chatroom.owner)
            flash[:error] = "You have been banned of this chatroom!" if @chatroom.banned.detect{ |e| e == current_user.id }
            redirect_to chatrooms_path(anchor: @chatroom.chatroom_type)
        end
    end
end

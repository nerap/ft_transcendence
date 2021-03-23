class ChatroomsController < ApplicationController
    respond_to :html, :json
    before_action :authenticate_user!
    before_action :load_entities
    before_action :check_permission, only: [:show]
    before_action { flash.clear }
    before_action :end_of_ban_mute

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
        elsif @chatroom.chatroom_type == "private" && !params[:chatroom][:password].empty?
            @chatroom.password = BCrypt::Password.create(params[:chatroom][:password])
        end
        if @chatroom.save
            flash[:notice] = "#{@chatroom.name} was created successfully"
            ActionCable.server.broadcast "chatrooms_channel", content: "ok"
            ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
        else
            respond_to do |format|
                flash[:error] = "Information is missing"
                ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                format.json { render json: { chatroom: @chatroom }, status: :unprocessable_entity }
            end
        end
    end

    def edit
    end

    def update
        @chatroom = Chatroom.find(params[:id])
        parameters = params.require(:chatroom).permit(:name, :chatroom_type)
        if (current_user.id == @chatroom.owner)
            @chatroom.assign_attributes(parameters)
            if @chatroom.chatroom_type == "public"
                @chatroom.password = nil
            end
            if @chatroom.chatroom_type == "private" && !params[:chatroom][:password].empty?
                @chatroom.password = BCrypt::Password.create(params[:chatroom][:password])
            end
            if @chatroom.save
                flash[:notice] = "#{@chatroom.name} was updated successfully"
                ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
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
        chatroom = Chatroom.find(params[:id])
        if is_owner(current_user.id, chatroom)
            ChatroomBan.where(chatroom_id: chatroom.id).destroy_all
            ChatroomMute.where(chatroom_id: chatroom.id).destroy_all
            name = chatroom.name
            chatroom.destroy
            respond_to do |format|
                flash[:notice] = "#{name} was deleted successfully"
                ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                format.json { head :no_content }
            end
        end
    end

    def login
        chatroom_id = params[:chatroom][:chatroom_id]
        chatroom = Chatroom.find(chatroom_id)
        passwd = BCrypt::Password.new(chatroom.password)
        if passwd == params[:chatroom][:chatroom_password]
            chatroom.members.push(current_user.id)
            respond_to do |format|
                if chatroom.save
                    flash[:notice] = "You are now a member of #{@chatroom.name} !"
                    ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                    ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                    format.json { render json: { chatroom: chatroom }, status: :ok }
                end
            end
        else
            respond_to do |format|
                flash[:error] = "Wrong password !"
                ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                format.json { render json: { chatroom: chatroom }, status: :unprocessable_entity }
            end
        end
    end

    def set_admin
        chatroom = Chatroom.find(params[:id])
        if User.find_by_username(params[:chatroom][:user])
            user = User.find_by_username(params[:chatroom][:user])
            if is_owner(current_user.id, chatroom) \
            && is_member(user.id, chatroom) \
            && !is_admin(user.id, chatroom) \
            && !is_owner(user.id, chatroom)
                chatroom.admin.push(user.id)
                respond_to do |format|
                    if chatroom.save
                        flash[:notice] = "You have named #{user.username} admin !"
                        ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                        ActionCable.server.broadcast "flash_admin_channel:#{user.id}", chatroom: chatroom, user: user.id, type: "admin"
                        ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                        format.json { render json: { chatroom: chatroom }, status: :ok }
                    end
                end
            end
        else
            respond_to do |format|
                flash[:error] = "User not found !"
                ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                format.json { render json: { chatroom: chatroom }, status: :not_found }
            end
        end
    end

    def unset_admin
        chatroom = Chatroom.find(params[:id])
        if User.find_by_username(params[:chatroom][:user])
            user = User.find_by_username(params[:chatroom][:user])
            if is_owner(current_user.id, chatroom) \
            && is_admin(user.id, chatroom)
                chatroom.admin.delete(user.id)
                respond_to do |format|
                    if chatroom.save
                        flash[:deleted] = "You have been demoted as member in #{chatroom.name} !"
                        ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                        ActionCable.server.broadcast "flash_admin_channel:#{user.id}", type: "flash", flash: flash
                        format.json { render json: { chatroom: chatroom }, status: :ok }
                    end
                end
            end
        else
            respond_to do |format|
                flash[:error] = "User not found !"
                ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                format.json { render json: { chatroom: chatroom }, status: :not_found }
            end
        end
    end

    def ban_user
        chatroom = Chatroom.find(params[:id])
        if User.find_by_username(params[:chatroom][:user])
            user = User.find_by_username(params[:chatroom][:user])
            if (is_owner(current_user.id, chatroom) || is_admin(current_user.id)) \
            && !is_owner(user.id, chatroom) \
            && !is_admin(user.id, chatroom) \
            && !is_banned(user.id, chatroom)
                chatroom.banned.push(user.id)
                if !params[:chatroom][:end_date].empty?
                    parse_time = params[:chatroom][:end_date].to_s + " " + params[:chatroom][:end_time].to_s
                    end_ban = DateTime.parse(parse_time) - 1.hours
                    if !end_ban.past?
                        chatroom_ban = ChatroomBan.new(user_id: user.id, chatroom_id: chatroom.id, end_time: end_ban)
                        chatroom_ban.save
                    end
                end
                if is_member(user.id, chatroom)
                    chatroom.members.delete(user.id)
                end
                if is_muted(user.id, chatroom)
                    chatroom.muted.delete(user.id)
                end
                respond_to do |format|
                    if chatroom.save
                        flash[:notice] = "You have banned #{user.username} !"
                        ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                        ActionCable.server.broadcast "flash_admin_channel:#{user.id}", chatroom: chatroom, user: user.id, type: "ban"
                        ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                        format.json { render json: { chatroom: chatroom }, status: :ok }
                    end
                end
            end
        else
            respond_to do |format|
                flash[:error] = "User not found !"
                ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                format.json { render json: { chatroom: chatroom }, status: :not_found }
            end
        end
    end

    def unban_user
        chatroom = Chatroom.find(params[:id])
        if User.find_by_username(params[:chatroom][:user])
            user = User.find_by_username(params[:chatroom][:user])
            if (is_owner(current_user.id, chatroom) || is_admin(current_user.id)) \
            && is_banned(user.id, chatroom)
                chatroom.banned.delete(user.id)
                ChatroomBan.where(user_id: user.id, chatroom_id: chatroom.id).destroy_all
                respond_to do |format|
                    if chatroom.save
                        flash[:notice] = "You have been unbanned from #{chatroom.name} !"
                        ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                        ActionCable.server.broadcast "flash_admin_channel:#{user.id}", type: "flash", flash: flash
                        format.json { render json: { chatroom: chatroom }, status: :ok }
                    end
                end
            end
        else
            respond_to do |format|
                flash[:error] = "User not found !"
                ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                format.json { render json: { chatroom: chatroom }, status: :not_found }
            end
        end
    end

    def mute_user
        chatroom = Chatroom.find(params[:id])
        if User.find_by_username(params[:chatroom][:user])
            user = User.find_by_username(params[:chatroom][:user])
            if (is_owner(current_user.id, chatroom) || is_admin(current_user.id)) \
            && is_member(user.id, chatroom) \
            && !is_owner(user.id, chatroom) \
            && !is_admin(user.id, chatroom) \
            && !is_muted(user.id, chatroom)
                chatroom.muted.push(user.id)
                if !params[:chatroom][:end_date].empty?
                    parse_time = params[:chatroom][:end_date].to_s + " " + params[:chatroom][:end_time].to_s
                    end_mute = DateTime.parse(parse_time) - 1.hours
                    if !end_mute.past?
                        chatroom_mute = ChatroomMute.new(user_id: user.id, chatroom_id: chatroom.id, end_time: end_mute)
                        chatroom_mute.save
                    end
                end
                respond_to do |format|
                    if chatroom.save
                        flash[:deleted] = "You have been muted from #{chatroom.name} !"
                        ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                        ActionCable.server.broadcast "flash_admin_channel:#{user.id}", type: "flash", flash: flash
                        format.json { render json: { chatroom: chatroom }, status: :ok }
                    end
                end
            end
        else
            respond_to do |format|
                flash[:error] = "User not found !"
                ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                format.json { render json: { chatroom: chatroom }, status: :not_found }
            end
        end
    end

    def unmute_user
        chatroom = Chatroom.find(params[:id])
        if User.find_by_username(params[:chatroom][:user])
            user = User.find_by_username(params[:chatroom][:user])
            if (is_owner(current_user.id, chatroom) || is_admin(current_user.id)) \
            && is_muted(user.id, chatroom)
                chatroom.muted.delete(user.id)
                ChatroomMute.where(user_id: user.id, chatroom_id: chatroom.id).destroy_all
                respond_to do |format|
                    if chatroom.save
                        flash[:notice] = "You have been unmuted from #{chatroom.name} !"
                        ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                        ActionCable.server.broadcast "flash_admin_channel:#{user.id}", type: "flash", flash: flash
                        format.json { render json: { chatroom: chatroom }, status: :ok }
                    end
                end
            end
        else
            respond_to do |format|
                flash[:error] = "User not found !"
                ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                format.json { render json: { chatroom: chatroom }, status: :not_found }
            end
        end
    end

    def leave
        chatroom = Chatroom.find(params[:id])
        if is_owner(current_user.id, chatroom) \
        && (newowner = User.find_by_username(params[:chatroom][:owner]))
            chatroom.owner = newowner.id
            if is_member(newowner.id, chatroom)
                chatroom.members.delete(newowner.id)
            end
            if is_admin(newowner.id, chatroom)
                chatroom.admin.delete(newowner.id)
            end
            if is_banned(newowner.id, chatroom)
                chatroom.banned.delete(newowner.id)
            end
            if is_muted(newowner.id, chatroom)
                chatroom.muted.delete(newowner.id)
            end
            ChatroomBan.where(chatroom_id: chatroom.id, user_id: newowner.id).destroy_all
            ChatroomMute.where(chatroom_id: chatroom.id, user_id: newowner.id).destroy_all
            respond_to do |format|
                if chatroom.save
                    ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                    ActionCable.server.broadcast "flash_admin_channel:#{newowner.id}", chatroom: chatroom, user: newowner.id, type: "owner"
                    format.json { render json: { chatroom: chatroom }, status: :ok }
                end
            end
        elsif !newowner
            respond_to do |format|
                flash[:error] = "User not found !"
                ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                format.json { render json: { chatroom: chatroom }, status: :not_found }
            end
        end
    end

    def join
        if @chatroom.chatroom_type == "public"
            if !is_member(current_user.id, @chatroom) \
            && !is_owner(current_user.id, @chatroom) \
            && !is_banned(current_user.id, @chatroom)
                @chatroom.members.push(current_user.id)
                respond_to do |format|
                    if @chatroom.save
                        flash[:notice] = "You are now a member of #{@chatroom.name} !"
                        ActionCable.server.broadcast "chatrooms_channel", content: "ok"
                        ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                        format.json { render json: { chatroom: @chatroom }, status: :ok }
                    end
                end
            elsif is_banned(current_user.id, @chatroom)
                respond_to do |format|
                    flash[:error] = "You are banned from #{@chatroom.name} !"
                    ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                    format.json { render json: { chatroom: @chatroom }, status: :forbidden }
                end
            end
        end
    end

    def unjoin
        if is_member(current_user.id, @chatroom) \
        && !is_owner(current_user.id, @chatroom)
            @chatroom.members.delete(current_user.id)
            if is_admin(current_user.id, @chatroom)
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
        elsif is_owner(current_user.id, @chatroom)
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

    def end_of_ban_mute
        if bans = ChatroomBan.where("end_time < ?", DateTime.now)
            bans.each do |ban|
                ban.chatroom.banned.delete(ban.user_id)
                ban.chatroom.save
                ban.destroy
                ActionCable.server.broadcast "chatrooms_channel", content: "ok"
            end
        end
        if mutes = ChatroomMute.where("end_time < ?", DateTime.now)
            mutes.each do |mute|
                mute.chatroom.muted.delete(mute.user_id)
                mute.chatroom.save
                mute.destroy
                ActionCable.server.broadcast "chatrooms_channel", content: "ok"
            end
        end
    end

    # utils
    def is_owner(usrid, chatroom)
        if chatroom.owner == usrid
            return 1
        end
        return nil
    end

    def is_admin(usrid, chatroom)
        if chatroom.admin.detect{ |e| e == usrid }
            return 1
        end
        return nil
    end

    def is_member(usrid, chatroom)
        if chatroom.members.detect{ |e| e == usrid }
            return 1
        end
        return nil
    end

    def is_banned(usrid, chatroom)
        if chatroom.banned.detect{ |e| e == usrid }
            return 1
        end
        return nil
    end

    def is_muted(usrid, chatroom)
        if chatroom.muted.detect{ |e| e == usrid }
            return 1
        end
        return nil
    end
end

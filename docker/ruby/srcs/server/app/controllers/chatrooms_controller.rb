class ChatroomsController < ApplicationController
    before_action :authenticate_user!
    before_action :load_entities
    before_action :check_if_member, only: [:show]
    before_action :banned_from_chatroom?, only: [:show]

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
            flash[:success] = "Chatroom #{@chatroom.name} was created successfully"
            redirect_to chatrooms_path
        else
            render :new
        end
    end

    def edit
        render :unauthorized, status: :forbidden if (current_user.id != @chatroom.owner)
    end

    def update
        @chatroom = Chatroom.find(params[:id])
        if (current_user.id == @chatroom.owner)
            if @chatroom.update(permitted_parameters)
                flash[:success] = "Chatroom #{@chatroom.name} was updated successfully"
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
        # if @chatroom.owner == current_user.id
        #     @chatroom.destroy
        #     redirect_to chatrooms_path
        # else
        #     render :unauthorized, status: :forbidden
        # end
        @chatroom.destroy
    end

    def login
        chatroom_id = params[:chatroom][:chatroom_id]
        chatroom = Chatroom.find(chatroom_id)
        if params[:chatroom][:chatroom_password] == chatroom.password
            chatroom.members.push(current_user.id)
            if chatroom.save
                redirect_to chatroom_path(chatroom)
                flash[:success] = "You are now a member of #{@chatroom.name}!"
            end
        end
    end

    def set_admin
        chatroom = Chatroom.find(params[:id])
        if current_user.id == chatroom.owner
            user = params[:userid].to_i
            chatroom.admin.push(user)
            if chatroom.save
                ActionCable.server.broadcast 'flash_admin_channel', chatroom: @chatroom, user: user, type: "admin"
                redirect_to @chatroom
            end
        end
    end

    def unset_admin
        chatroom = Chatroom.find(params[:id])
        if current_user.id == chatroom.owner
            user = params[:userid].to_i
            chatroom.admin.delete(user)
            chatroom.save
            redirect_to @chatroom
        end
    end

    def ban_user
        chatroom = Chatroom.find(params[:id])
        if (current_user.id == chatroom.owner || chatroom.admin.detect{ |e| e == current_user.id })
            user = params[:userid].to_i
            chatroom.banned.push(user)
            if chatroom.admin.detect{ |e| e == user }
                chatroom.admin.delete(user)
            end
            if chatroom.save
                ActionCable.server.broadcast 'flash_admin_channel', chatroom: @chatroom, user: user, type: "ban"
                redirect_to @chatroom
            end
        end
    end

    def unban_user
        chatroom = Chatroom.find(params[:id])
        if (current_user.id == chatroom.owner || chatroom.admin.detect{ |e| e == current_user.id })
            user = params[:userid].to_i
            chatroom.banned.delete(user)
            chatroom.save
            redirect_to @chatroom
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
                ActionCable.server.broadcast 'flash_admin_channel', chatroom: @chatroom, user: newowner.id, type: "owner"
                redirect_to @chatroom
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

    def check_if_member
        @chatroom = Chatroom.find(params[:id]) if params[:id]
        # redirect_to chatrooms_path if !@chatroom.members.detect{ |e| e == current_user.id }
        @chatroom.members.delete(current_user.id)
        @chatroom.save
    end

    def banned_from_chatroom?
        # ActionCable.server.broadcast 'flash_banned_channel', chatroom: @chatroom, user: current_user.id
        return render :index, status: :forbidden if @chatroom.banned.detect{ |e| e == current_user.id }
    end
end

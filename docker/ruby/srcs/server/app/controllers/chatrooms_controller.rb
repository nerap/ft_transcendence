class ChatroomsController < ApplicationController
    before_action :authenticate_user!
    before_action :load_entities
    before_action :check_access, only: [:show]

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
        if (current_user.id != @chatroom.owner)
            redirect_to @chatroom
        end
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
        @chatroom.destroy
        redirect_to chatrooms_path
    end

    def login
        chatroom_id = params[:chatroom][:chatroom_id]
        chatroom = Chatroom.find(chatroom_id)
        if params[:chatroom][:chatroom_password] == chatroom.password
            redirect_to chatroom_path(chatroom)
        end
    end

    def set_admin
        user = params[:userid].to_i
        chatroom = Chatroom.find(params[:id])
        chatroom.admin.push(user)
        chatroom.save
        if @chatroom.save
            ActionCable.server.broadcast 'flash_admin_channel', chatroom: @chatroom, user: user
            redirect_to @chatroom
        end
    end

    def unset_admin
        user = params[:userid].to_i
        chatroom = Chatroom.find(params[:id])
        chatroom.admin.delete(user)
        chatroom.save
        redirect_to @chatroom
    end

    def ban_user
    end

    def unban_user
    end

    protected
    def load_entities
        @chatrooms = Chatroom.all.order(:name)
        @chatroom = Chatroom.find(params[:id]) if params[:id]
    end

    def permitted_parameters
        params.require(:chatroom).permit(:name, :chatroom_type, :password, :owner)
    end

    def check_access
        # redirect_to chatrooms_path
    end
end

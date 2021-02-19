class ChatroomsController < ApplicationController
    before_action :authenticate_user!
    before_action :load_entities

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
    end

    def update
        @chatroom = Chatroom.find(params[:id])
        if @chatroom.update(permitted_parameters)
            flash[:success] = "Chatroom #{@chatroom.name} was updated successfully"
            redirect_to chatrooms_path
        else
            render :new
        end
    end

    def show
        @chat = Chat.new chatroom: @chatroom
        @chats = @chatroom.chat.includes(:user)
        find_owner
    end

    def destroy
        @chatroom.destroy
        render :index
    end

    protected
    def load_entities
        @chatrooms = Chatroom.all.order(:name)
        @chatroom = Chatroom.find(params[:id]) if params[:id]
    end

    def permitted_parameters
        params.require(:chatroom).permit(:name, :chatroom_type, :password, :owner)
    end

    def find_owner
        @chatroom = Chatroom.find(params[:id])
        @chatroom_owner = User.find(@chatroom.owner)
    end
end

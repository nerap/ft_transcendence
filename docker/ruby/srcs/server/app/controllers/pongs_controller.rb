class PongsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_pong, only: %i[ show edit update destroy ]
  
    # GET /friends or /friends.json
    def index
      @pongs = Pong.all
    end
  
    # GET /friends/1 or /friends/1.json
    def show
    end
  
    # GET /friends/new
    def new
      @pong = Pong.new
    end
  
    # GET /friends/1/edit
    def edit
    end
  
    # POST /friends or /friends.json
    def create
        @pong = Pong.new(pong_params)
        if @pong.save
          ActionCable.server.broadcast "pong_channel", content: "ok"
        end
    end

    def spectate
        user = User.find_by_id(current_user.id)
        user.pong = params[:room_id]
        if user.save
            ActionCable.server.broadcast "player_#{current_user.email}", content: "spectate"
        end
    end
  
    # PATCH/PUT /friends/1 or /friends/1.json
    def update
      if @pong.update(pong_params)
        ActionCable.server.broadcast "pong_channel", content: "ok"
      end
    end
  
    # DELETE /friends/1 or /friends/1.json
    def destroy
        @pong.destroy
        respond_to do |format|
          ActionCable.server.broadcast "pong_channel", content: "ok"
          format.json { head :no_content }
        end
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_pong
        @pong = Pong.find(params[:id])
      end
  
      # Only allow a list of trusted parameters through.
      def pong_params
        params.permit(:id, :user_left_id, :user_right_id, :user_left_score, :user_right_score, :done, :started, :mode, :playing, :winner, :looser, :tie, :room_id)
      end
end

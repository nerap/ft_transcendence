class GamesController < ApplicationController
    before_action :authenticate_user!
    before_action :set_game, only: %i[ show edit update destroy ]

  # GET /friends or /friends.json
  def index
    @games = Game.all
  end

  # GET /friends/1 or /friends/1.json
  def show
  end

  # GET /friends/new
  def new
    @game = Game.new
  end

  # GET /friends/1/edit
  def edit
  end

  # POST /friends or /friends.json
  def create
   # ActionCable.server.broadcast "users_channel", content: "profile"
   # ActionCable.server.broadcast "pong_channel", content: "ok"
    if params[:ladder] == "true"
        ranked = true
    else    
        ranked = false
    end
    ActionCable.server.broadcast "player_#{current_user.email}", content: "create a match", is_matchmaking: true, ranked: ranked, duel: false, user_one_email: "test@test.fr"
    
    #ActionCable.server.unsubscribed "player_#{ current_user }"
  end

  # PATCH/PUT /friends/1 or /friends/1.json
  def update
    
  end

  # DELETE /friends/1 or /friends/1.json
  def destroy
    game_id = @game.id
    @game.destroy
    respond_to do |format|
        ActionCable.server.broadcast "users_channel", content: "profile"
        ActionCable.server.broadcast "game_channel", content: "leave_game", userid: current_user.id, game_id: game_id
        format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def game_params
      params.permit(:id)
    end
end

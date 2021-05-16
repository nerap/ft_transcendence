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
    games = Game.where(done: false, pending: true)
    games.each do |game|
        pong = Pong.new()
        pong.user_one_id = game.user_one_id
        pong.user_two_id = current_user.id
        game.user_two_id = current_user.id
        pong.user_one_score = 0
        pong.user_two_score = 0
        pong.pending = true
        pong.started = false
        pong.done = false
        puts game.duel
        puts game_params[:duel]
        puts game.ladder
        puts game_params[:ladder]
        if game.duel == true && game_params[:duel] == "true"
            pong.ladder = false
            if game.reverse == game_params[:reverse]
                pong.mode = "reverse"
            elsif game.giant == game_params[:giant]
                pong.mode = "giant"
            elsif game.faster == game_params[:faster]
                pong.mode = "faster"
            else
                pong.mode = "classic"
            end
        elsif game.ladder == true && game_params[:ladder] == "true"
            pong.ladder = true
            if game.reverse == game_params[:reverse]
                pong.mode = "reverse"
            elsif game.giant == game_params[:giant]
                pong.mode = "giant"
            elsif game.faster == game_params[:faster]
                pong.mode = "faster"
            else
                pong.mode = "classic"
            end
        else
            next
        end
        if pong.save && game.save
            ActionCable.server.broadcast "users_channel", content: "profile"
            ActionCable.server.broadcast "pong_channel", content: "ok"
            ActionCable.server.broadcast "game_channel", content: "create_game", userid: current_user.id, game_id: game.id
        end
        return
    end
    @game = Game.new(game_params);
    if @game.save
        ActionCable.server.broadcast "users_channel", content: "profile"
        ActionCable.server.broadcast "game_channel", content: "create_game", userid: current_user.id, game_id: @game.id
    end
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
      params.permit(:user_one_id, :user_two_id, :user_one_score, :user_two_score, :duel, :ladder, :classic, :giant, :reverse, :faster, :pending, :done)
    end
end

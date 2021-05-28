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

    def duel_demand
      war = false
      user_one = User.find_by_id(params[:user_one_id])
      user_two = User.find_by_id(params[:user_two_id])

      if user_one.guild != nil && user_two.guild != nil
        guild_one = Guild.find_by_id(user_one.guild)
        guild_two = Guild.find_by_id(user_two.guild)
        if guild_one.war != nil && guild_two.war != nil
          if guild_one.war == guild_two.war
            guild_war = GuildWar.find_by_id(guild_one.war)
            if guild_war.started == true && guild_war.done == false
              war = true
            end
          end
        end
      end
      ActionCable.server.broadcast "flash_admin_channel:#{params[:user_two_id]}", type: "duel", user_one_name: user_one.username, user_one_id: params[:user_one_id], user_two_id: params[:user_two_id], war: war
    end

    def accept_duel
      if params[:war] == "true"
        ranked = "war"
      else
        ranked = "duel"
      end
      user_one_email = User.find_by_id(params[:user_one_id]).email
      puts ranked
      puts "LOLOLOLOLOL"
      ActionCable.server.broadcast "player_#{current_user.email}", content: "create a match", is_matchmaking: false, ranked: ranked, duel: true, user_one_email: user_one_email
      ActionCable.server.broadcast "player_#{user_one_email}", content: "create a match", is_matchmaking: false, ranked: "joining", duel: true, user_one_email: "test@test.fr"

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

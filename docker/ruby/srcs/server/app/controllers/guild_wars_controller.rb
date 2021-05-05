class GuildWarsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_guild_war, only: %i[ show edit update destroy ]
    before_action { flash.clear }
    before_action :check_war, :check_start_war,

    # GET /guilds or /guilds.json
    def index
      @guild_wars = GuildWar.all
    end
  
    # GET /guilds/1 or /guilds/1.json
    def show
    end
  
    # GET /guilds/new
    def new
      @guild_wars = GuildWar.new
    end
  
    # GET /guilds/1/edit
    def edit
    end
  
    def check_war
        @guild_wars = GuildWar.where(done: false, started: true)
        @guild_wars.each do |war|
            guild_one_id = Guild.find_by_id(war.guild_one_id)
            guild_two_id = Guild.find_by_id(war.guild_two_id)
            if (guild_one_id == nil)
                if (war.pending == false && war.done == false)
                    guild_two_id.war = nil
                end
                war.destroy
                if guild_two_id.save
                    ActionCable.server.broadcast "guild_war_channel", content: "ok"
                end
            elsif (guild_two_id == nil)
                if (war.pending == false && war.done == false)
                    guild_one_id.war = nil
                end
                war.destroy
                if guild_one_id.save
                    ActionCable.server.broadcast "guild_war_channel", content: "ok"
                end
            end
        end
        guild_content = Guild.all
        guild_content.each do |guild|
            if (guild.war != nil && GuildWar.find_by_id(guild.war) == nil)
                guild.war = nil
                if guild.save
                    ActionCable.server.broadcast "guild_war_channel", content: "ok"
                end
            end
        end
    end

    def check_start_war
        @guild_wars = GuildWar.all
        @guild_wars.each do |war|
            if (DateTime.now.change(:offset => "+0000").to_time > war.start.to_time)
                if (war.pending == true)
                    war.destroy
                    ActionCable.server.broadcast "guild_war_channel", content: "ok"
                elsif (war.started == false && war.pending == false)
                    war.started = true
                    if war.save
                        ActionCable.server.broadcast "guild_war_channel", content: "ok"
                    end
                end
            elsif (DateTime.now.change(:offset => "+0000").to_time > war.end.to_time)
                if (war.done == false && war.pending == false && war.started == true)
                    war.done = true
                    guild_one_id = Guild.find_by_id(war.guild_one_id)
                    guild_two_id = Guild.find_by_id(war.guild_two_id)
                    if (war.guild_one_points < war.guild_two_points)
                        guild_one_id.points -= war.prize
                        guild_two_id.points += war.prize
                    elsif (war.guild_one_points > war.guild_two_points)
                        guild_two_id.points -= war.prize
                        guild_one_id.points += war.prize
                    end
                    guild_one_id.war = false;
                    guild_two_id.war = false;
                    if war.save && guild_one_id.save && guild_two_id.save
                        ActionCable.server.broadcast "guild_war_channel", content: "ok"
                    end
                end
            end
        end
    end

    # POST /guilds or /guilds.json
    def create
        if (Guild.find_by_id(guild_war_params[:guild_one_id]).war == nil && Guild.find_by_id(guild_war_params[:guild_two_id]).war == nil)
            if (guild_war_params[:prize].to_i >= 10 && guild_war_params[:prize].to_i <= 100)
                if (guild_war_params[:guild_one_points].to_i == 0 && guild_war_params[:guild_two_points].to_i == 0)
                    if (guild_war_params[:unanswered_match].to_i >= 0 && guild_war_params[:unanswered_match].to_i <= 10)
                        if (guild_war_params[:duels] == "false" || guild_war_params[:duels] == "true")
                            if (guild_war_params[:ladder] == "false" || guild_war_params[:ladder] == "true")
                                    if (guild_war_params[:pending] == "true")
                                        guild_one = Guild.find_by_id(params[:guild_one_id])
                                        guild_two = Guild.find_by_id(params[:guild_two_id])
                                        if (guild_one.points < params[:prize].to_i)
                                            flash[:error] = ""
                                            flash[:error] = flash[:error] << "Your guild has not enough points" << "<br/>"
                                            respond_to do |format|
                                              ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                                              format.json { render json: { guild: @guild }, status: :unprocessable_entity }
                                            end
                                            return
                                        elsif (guild_two.points < params[:prize].to_i)
                                            flash[:error] = ""
                                            flash[:error] = flash[:error] << "Their guild has not enough points" << "<br/>"
                                            respond_to do |format|
                                              ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
                                              format.json { render json: { guild: @guild }, status: :unprocessable_entity }
                                            end
                                            return
                                        end
                                        @guild_war = GuildWar.new(guild_war_params)
                                        guild_one.war = @guild_war.id
                                        guild_two.war = @guild_war.id
                                        @guild_war.done = false;
                                        @guild_war.started = false;
                                        if @guild_war.save && guild_one.save && guild_two.save
                                            ActionCable.server.broadcast "users_channel", content: "profile"
                                            ActionCable.server.broadcast "guild_channel", content: "ok"
                                            ActionCable.server.broadcast "guild_war_channel", content: "create_guild_war", userid: current_user.id
                                        end
                                        return
                                    end
                            end
                        end
                    end
                end
            end
        end
        flash[:error] = "Check your parameter"
        ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
    end
  
    def forfeit
        @guild_war = GuildWar.find(params[:id])
        @guild_war.done = true
        @guild_war.started = true 
        @guild_war.pending = false
        guild_one_id = Guild.find_by_id(@guild_war.guild_one_id)
        guild_two_id = Guild.find_by_id(@guild_war.guild_two_id)
        if (params[:guild_forfeit].to_i == @guild_war.guild_one_id)
            guild_one_id.points -= @guild_war.prize
            guild_two_id.points += @guild_war.prize
            @guild_war.guild_one_points = 0
            @guild_war.guild_two_points = 100
        else
            guild_two_id.points -= @guild_war.prize
            guild_one_id.points += @guild_war.prize
            @guild_war.guild_one_points = 100
            @guild_war.guild_two_points = 0
        end
        guild_one_id.war = false;
        guild_two_id.war = false;
        if @guild_war.save && guild_one_id.save && guild_two_id.save
            ActionCable.server.broadcast "guild_channel", content: "ok"
            ActionCable.server.broadcast "guild_war_channel", content: "ok"
        end
    end

    # PATCH/PUT /guilds/1 or /guilds/1.json
    def update
      respond_to do |format|
        if @guild_war.update(guild_war_params)
          ActionCable.server.broadcast "guild_channel", content: "ok"
          ActionCable.server.broadcast "guild_war_channel", content: "ok"
          format.json { render :show, status: :ok, location: @guild_war }
        else
          format.json { render json: @guild_war.errors, status: :unprocessable_entity }
        end
      end
    end

    def accept_request
        @guild_war = GuildWar.find(params[:id])
        @guild_war.pending = false;
        guild_one = Guild.find_by_id(@guild_war.guild_one_id)
        guild_two = Guild.find_by_id(@guild_war.guild_two_id)
        guild_one.war = @guild_war.id
        guild_two.war = @guild_war.id
        if @guild_war.save && guild_one.save && guild_two.save
            ActionCable.server.broadcast "guild_channel", content: "ok"
            ActionCable.server.broadcast "guild_war_channel", content: "ok"
        end
    end

    # DELETE /guilds/1 or /guilds/1.json
    def destroy
      @guild_war.destroy
      respond_to do |format|
        ActionCable.server.broadcast "guild_channel", content: "ok"
        ActionCable.server.broadcast "guild_war_channel", content: "leave", userid: current_user.id
        format.json { head :no_content }
      end
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_guild_war
        @guild_war = GuildWar.find(params[:id])
      end
  
      # Only allow a list of trusted parameters through.
      def guild_war_params
        params.permit(:start, :end, :prize, :guild_one_id, :guild_two_id, :guild_one_points, :guild_two_points, :unanswered_match, :duels, :ladder, :faster, :giant, :reverse, :pending, :done, :started, :guild_forfeit)
      end

end

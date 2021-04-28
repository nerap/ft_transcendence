class GuildWarsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_guild_war, only: %i[ show edit update destroy ]
    before_action { flash.clear }
    before_action :check_war
    before_action :check_start_war
    before_action :check_has_start_war
    before_action :check_has_end_war
  
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
        @guild_wars = GuildWar.all
        @guild_wars.each do |war|
            guild_one_id = Guild.find_by_id(war.guild_one_id)
            guild_two_id = Guild.find_by_id(war.guild_two_id)
            if (guild_one_id == nil)
                if (war.pending == false && war.done == false)
                    guild_two_id.war = nil
                end
                war.destroy
                if guild_two_id.save
                    ActionCable.server.broadcast "guild_channel", content: "ok"
                    ActionCable.server.broadcast "guild_war_channel", content: "ok"
                end
            elsif (guild_two_id == nil)
                if (war.pending == false && war.done == false)
                    guild_one_id.war = nil
                end
                war.destroy
                if guild_one_id.save
                    ActionCable.server.broadcast "guild_channel", content: "ok"
                    ActionCable.server.broadcast "guild_war_channel", content: "ok"
                end
            end
        end
        guild_content = Guild.all
        guild_content.each do |guild|
            if (guild.war != nil && GuildWar.find_by_id(guild.war) == nil)
                guild.war = nil
                if guild.save
                    ActionCable.server.broadcast "guild_channel", content: "ok"
                    ActionCable.server.broadcast "guild_war_channel", content: "ok"
                end
            end
        end
    end

    def check_start_war
        @guild_wars = GuildWar.where(pending: true)
        @guild_wars.each do |war|
            if (DateTime.now.change(:offset => "+0000").to_time > war.start.to_time)
                if (war.pending == true)
                    war.destroy
                    ActionCable.server.broadcast "guild_channel", content: "ok"
                    ActionCable.server.broadcast "guild_war_channel", content: "ok"
                end
            end
        end
    end

    def check_has_start_war
        @guild_wars = GuildWar.where(started: false)
        @guild_wars.each do |war|
            if (DateTime.now.change(:offset => "+0000").to_time > war.start.to_time)
                if (war.started == false && war.pending == false)
                    war.started = true
                    if war.save
                        ActionCable.server.broadcast "guild_channel", content: "ok"
                        ActionCable.server.broadcast "guild_war_channel", content: "ok"
                    end
                end
            end
        end
    end

    def check_has_end_war
        @guild_wars = GuildWar.where(done: false, pending: false, started: true)
        @guild_wars.each do |war|
           if (DateTime.now.change(:offset => "+0000").to_time > war.end.to_time)
               if (war.done == false && war.pending == false)
                    war.done = true
                    guild_one_id = Guild.find_by_id(war.guild_one_id)
                    guild_two_id = Guild.find_by_id(war.guild_two_id)
                    if (war.guild_one_points < war.guild_two_points)
                        guild_one_id.points -= war.prize
                        guild_two_id.points = war.prize * 2
                    elsif (war.guild_one_points > war.guild_two_points)
                        guild_two_id.points -= war.prize
                        guild_one_id.points = war.prize * 2
                    end
                    guild_one_id.war = false;
                    guild_two_id.war = false;
                    if war.save && guild_one_id.save && guild_two_id.save
                       ActionCable.server.broadcast "guild_channel", content: "ok"
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
                                        @guild_war = GuildWar.new(guild_war_params)
                                        guild_one = Guild.find_by_id(@guild_war.guild_one_id)
                                        guild_two = Guild.find_by_id(@guild_war.guild_two_id)
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
        params.permit(:start, :end, :prize, :guild_one_id, :guild_two_id, :guild_one_points, :guild_two_points, :unanswered_match, :duels, :ladder, :faster, :giant, :reverse, :pending, :done, :started)
      end

end
json.extract!  @guild_war, :id, :start, :end, :prize, :guild_one_id, :guild_two_id, :guild_one_points, :guild_two_points, :unanswered_match, :duels, :ladder, :faster, :giant, :reverse, :created_at, :updated_at, :pending, :done, :started
json.url guild_war_url(@guild_war, format: :json)

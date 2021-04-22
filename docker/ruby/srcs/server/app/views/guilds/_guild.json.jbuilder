json.extract! guild, :id, :name, :anagram, :created_at, :updated_at, :points, :owner, :win, :loose
json.url guild_url(guild, format: :json)

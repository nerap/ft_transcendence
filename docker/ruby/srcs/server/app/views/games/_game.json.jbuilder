json.extract! game, :id, :user_one_id, :user_two_id, :user_one_score, :user_two_score, :classic, :giant, :reverse, :faster, :pending, :done
json.url game_url(game, format: :json)

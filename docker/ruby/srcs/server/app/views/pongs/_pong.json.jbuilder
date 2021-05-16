json.extract! pong, :id, :user_one_id, :user_two_id, :user_one_score, :user_two_score, :pending, :done, :started, :ladder, :mode
json.url pong_url(pong, format: :json)

json.extract! user, :id, :email, :username, :avatar, :block_list
json.url user_url(user, format: :json)

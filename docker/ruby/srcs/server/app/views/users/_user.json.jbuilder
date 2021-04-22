json.extract! user, :id, :email, :username, :avatar, :block_list, :guild, :officer, :online
json.url user_url(user, format: :json)

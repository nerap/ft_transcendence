json.extract! current_user, :id, :email, :username, :avatar, :block_list
json.url user_url(current_user, format: :json)

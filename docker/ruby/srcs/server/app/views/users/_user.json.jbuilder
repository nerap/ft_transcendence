json.extract! user, :id, :email, :username, :avatar, :block_list, :admin, :banned, :guild, :officer, :online, :otp_required_for_login
json.url user_url(user, format: :json)

json.extract! current_user, :id, :email, :username, :avatar, :block_list, :admin, :banned, :guild, :officer, :online, :otp_required_for_login, :member, :score, :pong, :tournament
json.url user_url(current_user, format: :json)

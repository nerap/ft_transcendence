json.extract! @guild_invitaion, :id, :user_id, :guild_id, :pending
json.url guild_invitation_url(@guild_invitaion, format: :json)
class GuildInvitationChannel < ApplicationCable::Channel
  def subscribed
    stream_from "guild_invitation_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

class GuildWarChannel < ApplicationCable::Channel
  def subscribed
    stream_from "guild_war_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

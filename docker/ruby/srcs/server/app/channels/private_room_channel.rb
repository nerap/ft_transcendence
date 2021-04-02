class PrivateRoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "private_room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

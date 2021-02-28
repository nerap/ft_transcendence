class FlashAdminChannel < ApplicationCable::Channel
  def subscribed
    stream_from "flash_admin_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

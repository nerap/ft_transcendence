class PmChannel < ApplicationCable::Channel
  def subscribed
    stream_from "pm_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "player_#{current_user.email}"
    if (params[:is_matchmaking])
      ranked = params[:ranked] ? "ladder" : "duel"
      Match.create(current_user.email, ranked)
    end
  end

  def unsubscribed
    if Redis.current.get('matches') == current_user.email
      Redis.current.set('matches', nil)
    end
    if Redis.current.get('matches_ladder') == current_user
      Redis.current.set('matches_ladder', nil)
    end
      # Any cleanup needed when channel is unsubscribed
  end
end

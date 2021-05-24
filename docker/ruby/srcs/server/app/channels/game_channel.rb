class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "player_#{current_user.email}"
    if (params[:is_matchmaking])
      ranked = params[:ranked] ? "ladder" : "duel"
      Match.create(current_user.email, ranked)
    end
  end

  def unsubscribed
    disconnected({player_email: current_user.email})
    if Redis.current.get('matches') == current_user.email
      Redis.current.set('matches', nil)
    end
    if Redis.current.get('matches_ladder') == current_user.email
      Redis.current.set('matches_ladder', nil)
    end
    
    user = User.find_by(email: current_user.email)
    puts user.pong
    puts "LOLLOLOLOL>OOOOOOOOOOOOOO"
    user.pong = 0
    if user.save
      ActionCable.server.broadcast "users_channel", content: "profile"
    end
      # Any cleanup needed when channel is unsubscribed
  end

  def disconnected(data)
    Game.disconnected(current_user.email)
  end
end

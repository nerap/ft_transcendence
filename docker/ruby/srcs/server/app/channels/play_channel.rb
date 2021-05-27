class PlayChannel < ApplicationCable::Channel
  def subscribed
    stream_from "play_channel_#{params[:game_room_id]}"
  end

  def unsubscribed
  end

  def update_left(data)
    room_name = data['room_name']
  
    $games[room_name][:ball_pos_x] = data['ballx']
    $games[room_name][:ball_pos_y] = data['bally']
    $games[room_name][:left_score] = data['user_left_score']
    $games[room_name][:left_action] = data['left_action']
    $games[room_name][:right_score] = data['user_right_score']
    $games[room_name][:ball_dir_x] = data['balldirx']
    $games[room_name][:ball_dir_y] = data['balldiry']
    $games[room_name][:ball_speed] = data['ballspeed']

    if ($games[room_name][:left_score] == 20)
      game = Pong.find_by(room_id: $games[room_name][:room_id])
			user_left = User.find_by_id(game.user_left_id)
      user_right = User.find_by_id(game.user_right_id)
    
			user_left.pong = 0
			user_right.pong = 0
      if game.mode == "ladder"
        if user_left.guild != nil
          guild = Guild.find_by_id(user_left.guild)
          guild.points += 10
          guild.save
        end
        user_left.score += 10
        user_right.score -= 10
        if (user_right.score < 0)
          user_right.score = 0
        end
      end
			game.winner = user_left.id
			game.looser = user_right.id
      game.user_left_score = $games[room_name][:left_score]
      game.user_right_score = $games[room_name][:right_score]
			game.tie = false
			game.done = true
			game.playing = false
      if game.save && user_left.save && user_right.save
        ActionCable.server.broadcast data['room_name'], content: "end";
        ActionCable.server.broadcast "pong_channel", content: "ok"
        ActionCable.server.broadcast "guild_channel", content: "ok"
        ActionCable.server.broadcast "users_channel", content: "profile"
      end
      users = User.where(pong: $games[room_name][:room_id])
      users.each do |temp|
        temp.pong = 0
        if temp.save
          ActionCable.server.broadcast data['room_name'], content: "end";
        end
     end
    elsif ($games[room_name][:right_score] == 20)
      game = Pong.find_by(room_id: $games[room_name][:room_id])
			user_left = User.find_by_id(game.user_left_id)
      user_right = User.find_by_id(game.user_right_id)

			user_left.pong = 0
			user_right.pong = 0
      if game.mode == "ladder"
        if user_right.guild != nil
          guild = Guild.find_by_id(user_right.guild)
          guild.points += 10
          guild.save
        end
        user_left.score -= 10
        user_right.score += 10
        if (user_left.score < 0)
          user_left.score = 0
        end
      end
			game.winner = user_right.id
			game.looser = user_left.id
      game.user_left_score = $games[room_name][:left_score]
      game.user_right_score = $games[room_name][:right_score]
			game.tie = false
			game.done = true
			game.playing = false
      if game.save && user_left.save && user_right.save
        ActionCable.server.broadcast data['room_name'], content: "end";
        ActionCable.server.broadcast "pong_channel", content: "ok"
        ActionCable.server.broadcast "guild_channel", content: "ok"
        ActionCable.server.broadcast "users_channel", content: "profile"
      end
      users = User.where(pong: $games[room_name][:room_id])
      users.each do |temp|
        temp.pong = 0
        if temp.save
          ActionCable.server.broadcast data['room_name'], content: "end";
        end
     end
    end
  end

  def update_right(data)
    $games[data['room_name']][:right_action] = data['paddle_right_y']
  end

  def get_datas(data)
    ActionCable.server.broadcast data['room_name'], $games[data['room_name']];
  end

  def leave(data)
    puts "LOLOLOLOL"
    puts data
    user = User.find_by_id(current_user.id)
    puts user.email
    user.pong = 0
    if user.save
      puts "LOLOLOLOL"
      ActionCable.server.broadcast "users_channel", content: "profile"
      ActionCable.server.broadcast "player_#{user.email}", {content: "disconnected"}
    end
  end
end

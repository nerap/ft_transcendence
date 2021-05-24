class Game < ApplicationRecord
    def self.start(player1, player2, ranked)
		left, right = [player1, player2].shuffle
		if (left != right)
            current_match_id = 1
			if Redis.current.get('match_id').blank? || Redis.current.get('match_id').to_i >= 999_999
				Redis.current.set('match_id', 1)
			else
				Redis.current.set('match_id', Redis.current.get('match_id').to_i + 1)
				current_match_id = Redis.current.get('match_id')
			end
            Redis.current.set("play_channel_#{current_match_id}_l", "#{left}")
			Redis.current.set("play_channel_#{current_match_id}_r", "#{right}")
            
            # user_one = User.find_by(email: left)
            # user_two = User.find_by(email: right)

            # user_one.pong = current_match_id
            # user_two.pong = current_match_id
            # user_one.save
            # user_two.save
            # ActionCable.server.broadcast "users_channel", content: "profile"
            # room_name = "play_channel_#{current_match_id}"

			# game = {
			# 	room_name: room_name,
			# 	ranked: ranked,
			# 	ball_pos_x: 0.0,
			# 	ball_pos_y: 0.0,
			# 	left_pos: 0.0,
			# 	right_pos: 0.0,
			# 	right_score: 0,
			# 	left_score: 0,
			# 	ball_speed: 0.0,
			# 	ball_dir_x: 0.0,
			# 	ball_dir_y: 0.0,
			# 	left_action: "w",
			# 	right_action: "w",
			# 	player_left_connected: false,
			# 	player_right_connected: false
			# }
			# $games[room_name] = game
	

            Redis.current.set("opponent_for:#{left}", right)
            Redis.current.set("opponent_for:#{right}", left)

            ActionCable.server.broadcast "player_#{left}", {action: "game_start", msg: "Left", match_room_id: current_match_id}
            ActionCable.server.broadcast "player_#{right}", {action: "game_start", msg: "Right", match_room_id: current_match_id}
		end
	end

    def self.disconnected(data)
        opponent = Redis.current.get("opponent_for:#{data}")
        puts "SALUTLSLAIFUSOAUFEIOWRHWEOUIHFOWEHFWOHFOI"
		puts data
		Redis.current.set("opponent_for:#{data}", nil)
        ActionCable.server.broadcast "player_#{opponent}", {content: "disconnected"}
    end
end

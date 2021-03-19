json.extract! chat, :id, :message, :created_at.to_s, :updated_at, :user_id, :chatroom_id
json.url chat_url(chat, format: :json)

json.extract! @chatroom, :id, :name, :chatroom_type, :password, :owner, :admin, :banned, :members, :muted, :chat
json.url chatroom_url(@chatroom, format: :json)

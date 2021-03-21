json.extract! chatroom, :id, :name, :chatroom_type, :password, :owner, :admin, :banned, :members, :muted
json.url chatroom_url(chatroom, format: :json)

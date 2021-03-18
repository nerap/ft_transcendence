json.extract! chatroom, :id, :name, :chatroom_type, :password, :owner, :admin, :banned, :members
json.url chatroom_url(chatroom, format: :json)

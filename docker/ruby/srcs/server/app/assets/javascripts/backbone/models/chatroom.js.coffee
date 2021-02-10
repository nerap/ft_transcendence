class Server.Models.Chatroom extends Backbone.Model
  paramRoot: 'chatroom'

  defaults:

class Server.Collections.ChatroomsCollection extends Backbone.Collection
  model: Server.Models.Chatroom
  url: '/chatrooms'

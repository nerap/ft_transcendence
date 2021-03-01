class Server.Models.Friend extends Backbone.Model
  paramRoot: 'friend'

  defaults:
    user_one_id: null
    user_two_id: null

class Server.Collections.FriendsCollection extends Backbone.Collection
  model: Server.Models.Friend
  url: '/friends'

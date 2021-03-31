//= require_self
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./routers
//= require_tree ./views
//= require_tree .

var Transcendence = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function (data) {
    this.chatrooms = new Transcendence.Collections.Chatrooms(data.chatrooms);
    this.private_rooms = new Transcendence.Collections.PrivateRooms(data.private_rooms);
    this.users = new Transcendence.Collections.Users(data.users);
    this.current_user = new window.Transcendence.UserSession(data.current_user);
    new Transcendence.Routers.Home();
    new Transcendence.Routers.Chatrooms();
    new Transcendence.Routers.PrivateRooms();
    new Transcendence.Routers.Users();
    Backbone.history.start();
  }
};

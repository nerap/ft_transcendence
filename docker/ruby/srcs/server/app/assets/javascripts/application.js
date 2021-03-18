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
        this.chatrooms = new Transcendence.Collections.Chatrooms();
        this.chatrooms.fetch();
        this.users = new Transcendence.Collections.Users(data.users);
        this.current_user = new window.Transcendence.UserSession(data.current_user);
        new Transcendence.Routers.Home();
        new Transcendence.Routers.Chatrooms();
        new Transcendence.Routers.Users();
        Backbone.history.start();
    }
};

jQuery.each( [ "put", "delete" ], function( i, method ) {
    jQuery[ method ] = function( url, data, callback, type ) {
      if ( jQuery.isFunction( data ) ) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
  
      return jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      });
    };
  });
  
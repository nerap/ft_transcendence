window.Transcendence.UserSession = Backbone.Model.extend({
    url: function () {
      return "/users/" + this.id
    }
  });
  
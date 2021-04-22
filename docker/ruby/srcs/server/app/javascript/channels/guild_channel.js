import consumer from "./consumer"

consumer.subscriptions.create("GuildChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    if (data.content == "create_guild") {
      Transcendence.users.fetch();
      Transcendence.guilds.fetch().done(function () {
        if (Transcendence.current_user.id == data.userid)
          location.hash = "#guilds/" + Transcendence.current_user.toJSON().guild;
      });
    } else if (data.content == "leave") {
      Transcendence.users.fetch();
      Transcendence.guilds.fetch().done(function () {
        if (Transcendence.current_user.id == data.userid)
          location.hash = "#guilds"
      });
    } else {
      Transcendence.guilds.fetch()
    }
  }
});

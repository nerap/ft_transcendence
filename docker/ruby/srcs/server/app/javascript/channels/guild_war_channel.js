import consumer from "./consumer"

consumer.subscriptions.create("GuildWarChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    if (data.content == "create_guild_war") {
      Transcendence.users.fetch();
      Transcendence.guilds.fetch();
      Transcendence.guild_wars.fetch().done(function () {
        if (Transcendence.current_user.id == data.userid)
          location.hash = "#guild_wars/" + Transcendence.current_user.toJSON().guild;
      });
    } else if (data.content == "delete_guild_war") {
      Transcendence.users.fetch();
      Transcendence.guilds.fetch();
      Transcendence.guild_wars.fetch().done(function () {
        if (Transcendence.current_user.id == data.userid)
          location.hash = "#guild_wars"
      });
    } else {
      Transcendence.users.fetch();
      Transcendence.guilds.fetch();
      Transcendence.guild_wars.fetch()
    }
  }
});

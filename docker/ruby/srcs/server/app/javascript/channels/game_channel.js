import consumer from "./consumer"

consumer.subscriptions.create("GameChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    if (data.content == "create_game") {
      Transcendence.users.fetch();
      Transcendence.games.fetch().done(function () {
        if (Transcendence.current_user.id == data.userid)
          location.hash = "#games/" + data.game_id;
      });
    } else if (data.content == "leave_game"){
      Transcendence.users.fetch();
      Transcendence.games.fetch().done(function () {
        if (Transcendence.current_user.id == data.user_one_id)
          location.hash = "#games";
      });
    } else {
      Transcendence.games.fetch()
    }
  }
});

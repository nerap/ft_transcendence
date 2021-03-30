import consumer from "./consumer"

consumer.subscriptions.create("UsersChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    Transcendence.current_user.fetch();
  }
});

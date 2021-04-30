import consumer from "./consumer"

const chatroomsChannel = consumer.subscriptions.create("ChatroomsChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    Transcendence.chatrooms.fetch();
  }
});

export default chatroomsChannel;
import consumer from "./consumer"

const chatroomsChannel = consumer.subscriptions.create("ChatroomsChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    if (data.content == "create_chatroom") {
      Transcendence.chatrooms.fetch().done(function () {
        if (Transcendence.current_user.id == data.userid)
          location.hash = "#chatrooms/public"
      });
    } else {
      Transcendence.chatrooms.fetch();
    }
  }
});

export default chatroomsChannel;
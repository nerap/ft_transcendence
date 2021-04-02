import consumer from "./consumer"

consumer.subscriptions.create("PrivateRoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    Transcendence.private_rooms.fetch().done(function () {
      if (Transcendence.current_user.id == data.userid)
        location.hash = "#private_rooms/" + data.roomid;
    });
  }
});

import consumer from "./consumer"

consumer.subscriptions.create("PmChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    Transcendence.private_rooms.get(data.content.private_room_id).fetch().done(function () {
      if (Transcendence.current_user.id == data.content.user_id)
        $('#text-pm-field').val('');
    });
  }
});

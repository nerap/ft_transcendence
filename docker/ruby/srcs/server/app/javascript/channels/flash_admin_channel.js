import consumer from "./consumer"

consumer.subscriptions.create("FlashAdminChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    if (data.type == "admin" || data.type == "ban" || data.type == "owner") {
      let currentChatroom = sessionStorage.getItem('chat_roomid')
      if (data.chatroom.id == currentChatroom) {
        var elem = `#flash-${data.type}-message`
        $(elem).show();
      }
    }
    else if (data.type == "flash" && data.flash) {
      flashMessage(data.flash[0][0], data.flash[0][1]);
    }
  }
});

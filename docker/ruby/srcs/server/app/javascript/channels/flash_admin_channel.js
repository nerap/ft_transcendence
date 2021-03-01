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
    let currentUser = sessionStorage.getItem('chat_userid');
    let currentChatroom = sessionStorage.getItem('chat_roomid')
    if (data.user == currentUser && data.chatroom.id == currentChatroom) {
      function showFlashMessage(element) {
        element.style.display = "block";
      };
      var elem = `flash-${data.type}-message`
      var flashMessages = document.getElementById(elem);
      showFlashMessage(flashMessages);
    }
  }
});

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
      let currentUser = sessionStorage.getItem('chat_userid');
      let currentChatroom = sessionStorage.getItem('chat_roomid')
      if (data.user == currentUser && data.chatroom.id == currentChatroom) {
        var elem = `#flash-${data.type}-message`
        $(elem).show();
      }
    }
    else if (data.type == "flash" && data.flash) {
      var flash = `<div class="${data.flash[0][0]}">` +
        `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>` +
        `${data.flash[0][1]}` +
        `</div>`
      $("#flash-message").append(flash);
      setTimeout(function () {
        $(`.${data.flash[0][0]}`).slideUp(500);
      }, 3000);
    }
  }
});

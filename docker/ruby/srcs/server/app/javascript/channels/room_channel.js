import consumer from "./consumer"

const roomChannel = consumer.subscriptions.create("RoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    let currentRoom = sessionStorage.getItem('chat_roomid')
    var loc = "#chatrooms/" + currentRoom;
    if (data.content.message && currentRoom == data.content.chatroom_id && location.hash == loc) {
      let currentUser = sessionStorage.getItem('chat_userid')
      let msg_class = currentUser == data.content.user_id ? "sent" : "received"
      var textMessage1 = `<table class="${msg_class}">`
      if (msg_class == "sent") {
        var textMessage2 = `<tr><td class="message-header">` + data.user + ` <img class="user-avatar-${msg_class}" src="/assets/blank-profile-picture.jpg" /></td></tr>`
      } else {
        var textMessage2 = `<tr><td class="message-header"><img class="user-avatar-${msg_class}" src="/assets/blank-profile-picture.jpg" /> ` + data.user + `</td></tr>`
      }
      var textMessage3 = `<tr><td class="message-content">` + data.content.message + `</td></tr>` +
        `<tr><td class="message-footer">` + data.created_at + `</td></tr>` +
        `</table>`;
      var textMessage = textMessage1 + textMessage2 + textMessage3;
      $('#messages').append(textMessage)
      $('#text-field').val('')
      var chatHistory = document.getElementById("messages");
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }
});

export default roomChannel;
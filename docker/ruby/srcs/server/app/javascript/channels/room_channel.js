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
    if (data.content.message && currentRoom == data.content.chatroom_id) {
      let currentUser = sessionStorage.getItem('chat_userid')
      let msg_class = currentUser == data.content.user_id ? "sent" : "received"
      var textMessage1 = `<p class="${msg_class}">`
      if (msg_class == "sent") {
        var textMessage2 = `<span class="message-header">` + data.user + ` <img class="user-avatar-${msg_class}" src="/assets/blank-profile-picture.jpg" /></span><br/>`
      } else {
        var textMessage2 = `<span class="message-header"><img class="user-avatar-${msg_class}" src="/assets/blank-profile-picture.jpg" /> ` + data.user + `</span><br/>`
      }
      var textMessage3 = `<span class="message-content">` + data.content.message + `</span><br/>` +
      `<span class="message-footer">` + data.created_at + `</span>` +
      `</p>`;
      var textMessage = textMessage1 + textMessage2 + textMessage3;
      $('#messages').append(textMessage)
      $('#text-field').val('')
    }
    var chatHistory = document.getElementById("messages");
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }
});

export default roomChannel;
import consumer from "./consumer"

const roomChannel = consumer.subscriptions.create("RoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    if (data.content.message) {
      let currentUser = sessionStorage.getItem('chat_userid')
      let msg_class = currentUser == data.content.user_id ? "sent" : "received"
      var textMessage = `<p class='${msg_class}'>` + data.content.message + '</p>'
      $('#messages').append(textMessage)
      $('#text-field').val('')
    }
    var chatHistory = document.getElementById("messages");
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }
});

export default roomChannel;
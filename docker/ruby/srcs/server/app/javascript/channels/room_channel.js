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
      $('#messages').append('<p class="sent">' + data.content.message + '</p>')
      $('#field').val('')
    }
    var chatHistory = document.getElementById("messages");
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }
});

export default roomChannel;
import consumer from "./consumer"

const chatroomsChannel = consumer.subscriptions.create("ChatroomsChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    Transcendence.chatrooms.fetch();
    var flash = `<div class="${data.flash[0][0]}">` +
    `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>` +
    `${data.flash[0][1]}` +
    `</div>`
    $("#flash-message").append(flash);
    setTimeout(function() {
      $(`.${data.flash[0][0]}`).slideUp(500);
    }, 3000);
  }
});

export default chatroomsChannel;
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
    else if (data.war == true)
    {
      console.log("war match")
     /* var flash = `<div class="flash-admin-message"> ` +
        `Duel request from` + data.user_one_id +
        `<form action="/api/pongs/accept_duel" method="post" data-remote="true" class="send-pm" id="member-<%= chatroom.members[i] %>">` +
        `<button type="submit" class="menu-option">Accept Duel</button>` +
        `<input value="` + data.user_one_id + `" type="hidden" name="user_one_id">` +
        `<input value="` + data.user_two_id + `" type="hidden" name="user_two_id">` +
        `<input type="hidden" value="` + data.war + `" type="hidden" name="war">` +
        `</form>` +
        `<span class="closebtn" onclick="$(this.parentElement).remove();">&times;</span>` +
        `</div>`
    $("#parent-flash").append(flash);
    setTimeout(function () {
        $("#parent-flash").find('div:first').slideUp(500, function () {this.remove()});
    }, 3000);*/
    }
    else if (data.type == "duel")
    {
      var flash = `<div class="flash-admin-message"> ` +
        `Duel request from` + data.user_one_id +
        `<form action="/api/pongs/accept_duel" method="post" data-remote="true" class="send-pm" id="member-<%= chatroom.members[i] %>">` +
        `<button type="submit" class="menu-option">Accept Duel</button>` +
        `<input value="` + data.user_one_id + `" type="hidden" name="user_one_id">` +
        `<input value="` + data.user_two_id + `" type="hidden" name="user_two_id">` +
        `<input type="hidden" value="` + data.war + `" type="hidden" name="war">` +
        `</form>` +
        `<span class="closebtn" onclick="$(this.parentElement).remove();">&times;</span>` +
        `</div>`
    $("#parent-flash").append(flash);
    setTimeout(function () {
        $("#parent-flash").find('div:first').slideUp(500, function () {this.remove()});
    }, 3000);

        
    }
  }
});

import consumer from "./consumer"

consumer.subscriptions.create("GuildInvitationChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    Transcendence.guild_invitations.fetch().done(function () {
      console.log("salut");
    });
  }
});

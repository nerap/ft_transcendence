Transcendence.Views.ChatroomEdit = Backbone.View.extend({
    initialize: function () {
        // this.listenTo(Transcendence.chatrooms, 'sync', function () {
            // this.model = Transcendence.chatrooms.get(this.id).toJSON();
            // this.render()
        // });
    },
    render: function () {
        if (Transcendence.current_user.id != Transcendence.chatrooms.get(this.id).toJSON().owner) {
            var loc = "#chatrooms/" + this.id;
            location.hash = loc;
            var flash = `<div class="error">` +
                `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>` +
                `You are not the owner of this chatroom !` +
                `</div>`
            $("#flash-message").append(flash);
            setTimeout(function () {
                $(`.error`).slideUp(500);
            }, 3000);
        }
        this.$el.html(JST['templates/chatrooms/edit_panel']({
            chatroom: this.model,
        }));
        return this
    },
});

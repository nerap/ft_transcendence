Transcendence.Views.ChatroomAdmin = Backbone.View.extend({
    events: {
    },
    initialize: function () {
        this.listenTo(Transcendence.chatrooms, 'sync', function () {
            this.model = Transcendence.chatrooms.get(this.id).toJSON();
            this.render()
        });
    },
    render: function () {
        if (!Transcendence.chatrooms.get(this.id)) {
            location.hash = "#chatrooms/public";
            var flash = `<div class="error">` +
                `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>` +
                `This chatroom doesn't exist !` +
                `</div>`
            $("#flash-message").append(flash);
            setTimeout(function () {
                $(`.error`).slideUp(500);
            }, 3000);
        } else if (Transcendence.current_user.id != Transcendence.chatrooms.get(this.id).toJSON().owner && !Transcendence.chatrooms.get(this.id).toJSON().admin.includes(Transcendence.current_user.id)) {
            var loc = "#chatrooms/" + this.id;
            location.hash = loc;
        } else {
            this.$el.html(JST['templates/chatrooms/admin_panel']({
                chatroom: this.model,
                members: this.model.members,
                admins: this.model.admin,
                banned: this.model.banned,
                muted: this.model.muted
            }));
        }
        return this
    },
});

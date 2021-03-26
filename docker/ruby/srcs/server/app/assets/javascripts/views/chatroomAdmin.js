Transcendence.Views.ChatroomAdmin = Backbone.View.extend({
    events: {
    },
    initialize: function () {
        this.listenTo(Transcendence.chatrooms, 'sync', function () {
            if (Transcendence.chatrooms.get(this.id)) {
                this.model = Transcendence.chatrooms.get(this.id).toJSON();
                this.render();
            } else {
                this.remove();
                location.hash = "#chatrooms/public"
            }
        });
    },
    render: function () {
        if (Transcendence.current_user.id != Transcendence.chatrooms.get(this.id).toJSON().owner && !Transcendence.chatrooms.get(this.id).toJSON().admin.includes(Transcendence.current_user.id)) {
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
        return this;
    },
});

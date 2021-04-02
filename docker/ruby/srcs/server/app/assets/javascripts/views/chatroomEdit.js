Transcendence.Views.ChatroomEdit = Backbone.View.extend({
    events: {
        "submit #destroy-chatroom": "destroy"
    },
    initialize: function () {
        this.listenTo(Transcendence.chatrooms.get(this.id), "change:name change:chatroom_type change:owner remove", function () {
            if (!Transcendence.chatrooms.get(this.id)) {
                this.remove();
                location.hash = "#chatrooms/public";
            } else {
                this.model = Transcendence.chatrooms.get(this.id).toJSON();
                this.render();
            }
        })
    },
    destroy: function () {
        location.hash = "#chatrooms/public"
    },
    render: function () {
        if (Transcendence.current_user.id != Transcendence.chatrooms.get(this.id).toJSON().owner) {
            this.remove();
            location.hash = "#chatrooms/public";
        } else {
            this.$el.html(JST['templates/chatrooms/edit_panel']({
                chatroom: this.model,
            }));
        }
        return this;
    },
});

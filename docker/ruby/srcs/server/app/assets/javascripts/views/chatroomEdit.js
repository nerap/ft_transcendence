Transcendence.Views.ChatroomEdit = Backbone.View.extend({
    events: {
        "submit #destroy-chatroom": "destroy"
    },
    initialize: function () {
        var self = this;
        Transcendence.chatrooms.get(this.id).on("change:name change:chatroom_type change:owner", function () {
            self.model = Transcendence.chatrooms.get(this.id).toJSON();
            self.render();
        });
        this.listenTo(Transcendence.chatrooms.get(this.id), "remove", function () {
            this.remove();
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

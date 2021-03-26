Transcendence.Views.ChatroomEdit = Backbone.View.extend({
    events: {
        "submit #destroy-chatroom": "destroy"
    },
    initialize: function () {
        this.listenTo(Transcendence.chatrooms, 'sync', function () {
            if (Transcendence.chatrooms.get(this.id)) {
                this.model = Transcendence.chatrooms.get(this.id).toJSON();
                this.render();
            }
        });
    },
    destroy: function () {
        location.hash = "#chatrooms/public"
    },
    render: function () {
        this.$el.html(JST['templates/chatrooms/edit_panel']({
            chatroom: this.model,
        }));
        return this;
    },
});

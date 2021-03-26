Transcendence.Views.ChatroomEdit = Backbone.View.extend({
    events: {
        "submit #destroy-chatroom": "destroy"
    },
    initialize: function () {
        var self = this;
        Transcendence.chatrooms.get(this.id).on("change:name change:chatroom_type", function () {
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
        this.$el.html(JST['templates/chatrooms/edit_panel']({
            chatroom: this.model,
        }));
        return this;
    },
});

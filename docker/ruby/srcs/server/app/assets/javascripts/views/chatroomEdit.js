Transcendence.Views.ChatroomEdit = Backbone.View.extend({
    initialize: function () {
        this.listenTo(Transcendence.chatrooms, 'remove', this.render);
    },
    render: function () {
        if (!Transcendence.chatrooms.get(this.id)) {
            location.hash = "#chatrooms/public";
        } else if (Transcendence.current_user.id != Transcendence.chatrooms.get(this.id).toJSON().owner) {
            var loc = "#chatrooms/" + this.id;
            location.hash = loc;
        } else {
            this.$el.html(JST['templates/chatrooms/edit_panel']({
                chatroom: this.model,
            }));
        }
        return this
    },
});

Transcendence.Views.ChatroomShow = Backbone.View.extend ({
    render: function () {
        this.$el.html(JST['templates/chatrooms/chatroom']({ chatroom: this.model }));
        return this
    },
});

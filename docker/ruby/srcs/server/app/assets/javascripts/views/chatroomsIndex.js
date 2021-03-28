Transcendence.Views.ChatroomsIndex = Backbone.View.extend({
    initialize: function () {
        this.listenTo(this.collection, 'sync', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/chatrooms/index']());
        if (window.location.hash == "#chatrooms/public" || window.location.hash == "#chatrooms") {
            var chatroomView = JST['templates/chatrooms/public']({ chatrooms: this.collection.where({chatroom_type: "public"}) });
        } else if (window.location.hash == "#chatrooms/private") {
            var chatroomView = JST['templates/chatrooms/private']({ chatrooms: this.collection.where({chatroom_type: "private"}) });
        }
        this.$('.chatrooms-list').append(chatroomView);
        return this;
    },
});

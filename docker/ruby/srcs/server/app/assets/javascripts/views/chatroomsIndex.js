Transcendence.Views.ChatroomsIndex = Backbone.View.extend({
    events: {
    },
    initialize: function () {
        this.listenTo(this.collection, 'sync', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/chatrooms/index']());
        if (window.location.hash == "#chatrooms/public" || window.location.hash == "#chatrooms") {
            var chatroomView = JST['templates/chatrooms/public']();
        } else if (window.location.hash == "#chatrooms/private") {
            var chatroomView = JST['templates/chatrooms/private']();
        }
        this.$('.chatrooms-list').append(chatroomView);
        return this
    },
});

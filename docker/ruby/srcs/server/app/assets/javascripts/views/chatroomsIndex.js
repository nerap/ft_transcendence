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
        } else if (window.location.hash == "#chatrooms/my_chatrooms") {
            var joined = this.collection.filter(function(chatroom){
                return chatroom.toJSON().members.includes(Transcendence.current_user.id);
            });
            var chatroomView = JST['templates/chatrooms/my_chatrooms']({
                owned: this.collection.where({owner: Transcendence.current_user.id}),
                joined: joined
            });
        }
        this.$('.chatrooms-list').append(chatroomView);
        return this;
    },
});

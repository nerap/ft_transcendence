Transcendence.Routers.Chatrooms = Backbone.Router.extend({
    routes: {
        "chatrooms": "index",
        "chatrooms/new": "new",
        "chatrooms/:id": "show"
    },

    index: function() {
        var viewIndex = new Transcendence.Views.ChatroomsIndex({ collection: Transcendence.chatrooms });
        $('#main-body').html(viewIndex.render().$el);
    },
    new: function() {
        alert("new!!")
    },
    show: function(id) {
        var viewChatroom = new Transcendence.Views.ChatroomShow({ model: Transcendence.chatrooms.get(id).toJSON() });
        $('#main-body').html(viewChatroom.render().$el);
    }
});

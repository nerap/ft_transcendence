Transcendence.Routers.Chatrooms = Backbone.Router.extend({
    routes: {
        "chatrooms": "index",
        "chatrooms/public": "index",
        "chatrooms/private": "index",
        "chatrooms/new": "new",
        "chatrooms/:id": "show",
        "chatrooms/:id/edit": "edit",
    },

    index: function() {
        var viewIndex = new Transcendence.Views.ChatroomsIndex({ collection: Transcendence.chatrooms });
        $('#main-body').html(viewIndex.render().$el);
    },
    new: function() {
        alert("new!!")
    },
    show: function(id) {
        var showChatroom = new Transcendence.Views.ChatroomShow({ model: Transcendence.chatrooms.get(id).toJSON(), collection: Transcendence.chats.where({ chatroom_id: parseInt(id) }) });
        $('#main-body').html(showChatroom.render().$el);
    },
    edit: function(id) {
        var editChatroom = new Transcendence.Views.ChatroomEdit();
        $('#main-body').html(editChatroom.render().$el);
    }
});

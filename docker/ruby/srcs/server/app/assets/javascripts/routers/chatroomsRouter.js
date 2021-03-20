Transcendence.Routers.Chatrooms = Backbone.Router.extend({
    routes: {
        "chatrooms": "index",
        "chatrooms/public": "index",
        "chatrooms/private": "index",
        "chatrooms/new": "new",
        "chatrooms/:id": "show",
        "chatrooms/:id/edit": "edit",
    },

    index: function () {
        var viewIndex = new Transcendence.Views.ChatroomsIndex({ collection: Transcendence.chatrooms });
        $('#main-body').html(viewIndex.render().$el);
    },
    new: function () {
        alert("new!!")
    },
    show: function (id) {
        if (Transcendence.current_user.id == Transcendence.chatrooms.get(id).toJSON().owner || Transcendence.chatrooms.get(id).toJSON().members.includes(Transcendence.current_user.id)) {
            var showChatroom = new Transcendence.Views.ChatroomShow({
                id: id,
                model: Transcendence.chatrooms.get(id).toJSON(),
                collection: Transcendence.chats.where({ chatroom_id: parseInt(id) })
            });
            $('#main-body').html(showChatroom.render().$el);
        }
        else {
            if (Transcendence.chatrooms.get(id).toJSON().banned.includes(Transcendence.current_user.id)) {
                msg = "You have been banned from this chatroom !"
            }
            else {
                msg = "You are not a member of this chatroom !"
            }
            window.history.back();
            var flash = `<div class="error">` +
                `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>` +
                `${msg}` +
                `</div>`
            $("#flash-message").append(flash);
            setTimeout(function () {
                $(`.error`).slideUp(500);
            }, 3000);
        }
    },
    edit: function (id) {
        var editChatroom = new Transcendence.Views.ChatroomEdit();
        $('#main-body').html(editChatroom.render().$el);
    }
});

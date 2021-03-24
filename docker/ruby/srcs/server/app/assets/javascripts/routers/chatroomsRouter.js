Transcendence.Routers.Chatrooms = Backbone.Router.extend({
    routes: {
        "chatrooms": "index",
        "chatrooms/public": "index",
        "chatrooms/private": "index",
        "chatrooms/new": "new",
        "chatrooms/:id": "show",
        "chatrooms/:id/edit": "edit",
        "chatrooms/:id/admin": "admin",
    },

    index: function () {
        var viewIndex = new Transcendence.Views.ChatroomsIndex({ collection: Transcendence.chatrooms });
        $('#main-body').html(viewIndex.render().$el);
    },
    new: function () {
        var newChatroom = new Transcendence.Views.ChatroomNew();
        $('#main-body').html(newChatroom.render().$el);
    },
    show: function (id) {
        if (!Transcendence.chatrooms.get(id)) {
            location.hash = "#chatrooms/public";
            var flash = `<div class="error">` +
                `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>` +
                `This chatroom doesn't exist !` +
                `</div>`
            $("#flash-message").append(flash);
            setTimeout(function () {
                $(`.error`).slideUp(500);
            }, 3000);
        } else {
            if (Transcendence.current_user.id == Transcendence.chatrooms.get(id).toJSON().owner || Transcendence.chatrooms.get(id).toJSON().members.includes(Transcendence.current_user.id)) {
                var showChatroom = new Transcendence.Views.ChatroomShow({
                    id: id,
                    model: Transcendence.chatrooms.get(id).toJSON(),
                    collection: Transcendence.chats.where({ chatroom_id: parseInt(id) })
                });
                $('#main-body').html(showChatroom.render().$el);
            } else {
                if (Transcendence.chatrooms.get(id).toJSON().banned.includes(Transcendence.current_user.id)) {
                    msg = "You have been banned from this chatroom !"
                }
                else {
                    msg = "You are not a member of this chatroom !"
                }
                hash = Transcendence.chatrooms.get(id).toJSON().chatroom_type
                location.hash = "#chatrooms/" + hash;
                var flash = `<div class="error">` +
                    `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>` +
                    `${msg}` +
                    `</div>`
                $("#flash-message").append(flash);
                setTimeout(function () {
                    $(`.error`).slideUp(500);
                }, 3000);
            }
        }
    },
    edit: function (id) {
        if (!Transcendence.chatrooms.get(id)) {
            location.hash = "#chatrooms/public";
            var flash = `<div class="error">` +
                `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>` +
                `This chatroom doesn't exist !` +
                `</div>`
            $("#flash-message").append(flash);
            setTimeout(function () {
                $(`.error`).slideUp(500);
            }, 3000);
        } else {
            if (Transcendence.current_user.id == Transcendence.chatrooms.get(id).toJSON().owner) {
                var editChatroom = new Transcendence.Views.ChatroomEdit({
                    model: Transcendence.chatrooms.get(id).toJSON(),
                    id: id,
                });
                $('#main-body').html(editChatroom.render().$el);
            } else {
                loc = "#chatrooms/" + id;
                location.hash = loc;
                var flash = `<div class="error">` +
                    `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>` +
                    `You are not the owner of this chatroom !` +
                    `</div>`
                $("#flash-message").append(flash);
                setTimeout(function () {
                    $(`.error`).slideUp(500);
                }, 3000);
            }
        }
    },
    admin: function (id) {
        if (!Transcendence.chatrooms.get(id)) {
            location.hash = "#chatrooms/public";
            var flash = `<div class="error">` +
                `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>` +
                `This chatroom doesn't exist !` +
                `</div>`
            $("#flash-message").append(flash);
            setTimeout(function () {
                $(`.error`).slideUp(500);
            }, 3000);
        } else {
            if (Transcendence.current_user.id == Transcendence.chatrooms.get(id).toJSON().owner || Transcendence.chatrooms.get(id).toJSON().admin.includes(Transcendence.current_user.id)) {
                var adminChatroom = new Transcendence.Views.ChatroomAdmin({
                    model: Transcendence.chatrooms.get(id).toJSON(),
                    id: id,
                });
                $('#main-body').html(adminChatroom.render().$el);
            } else {
                loc = "#chatrooms/" + id;
                location.hash = loc;
                var flash = `<div class="error">` +
                    `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>` +
                    `You are not admin of this chatroom !` +
                    `</div>`
                $("#flash-message").append(flash);
                setTimeout(function () {
                    $(`.error`).slideUp(500);
                }, 3000);
            }
        }
    }
});

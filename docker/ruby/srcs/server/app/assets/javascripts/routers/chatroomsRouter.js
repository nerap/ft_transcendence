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
    initialize: function () {
        this.view = null;
    },
    cleanUp: function () {
        if (this.view)
            this.view.remove();
        this.view = null;
    },
    index: function () {
        this.cleanUp();
        this.view = new Transcendence.Views.ChatroomsIndex({ collection: Transcendence.chatrooms });
        $('#main-body').html(this.view.render().$el);
    },
    new: function () {
        this.cleanUp();
        this.view = new Transcendence.Views.ChatroomNew();
        $('#main-body').html(this.view.render().$el);
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
                this.cleanUp();
                this.view = new Transcendence.Views.ChatroomShow({
                    id: id,
                    model: Transcendence.chatrooms.get(id).toJSON(),
                    collection: Transcendence.chats.where({ chatroom_id: parseInt(id) })
                });
                $('#main-body').html(this.view.render().$el);
            } else {
                if (Transcendence.chatrooms.get(id).toJSON().banned.includes(Transcendence.current_user.id)) {
                    msg = "You have been banned from this chatroom !"
                }
                else {
                    msg = "You are not a member of this chatroom !"
                }
                var hash = Transcendence.chatrooms.get(id).toJSON().chatroom_type
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
                this.cleanUp();
                this.view = new Transcendence.Views.ChatroomEdit({
                    model: Transcendence.chatrooms.get(id).toJSON(),
                    id: id,
                });
                $('#main-body').html(this.view.render().$el);
            } else {
                var loc = "#chatrooms/" + id;
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
                this.cleanUp();
                this.view = new Transcendence.Views.ChatroomAdmin({
                    model: Transcendence.chatrooms.get(id).toJSON(),
                    id: id,
                });
                $('#main-body').html(this.view.render().$el);
            } else {
                var loc = "#chatrooms/" + id;
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

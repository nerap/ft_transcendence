Transcendence.Views.ChatroomShow = Backbone.View.extend({
    events: {
        "click .member-name, .member-owner, .member-admin": "menu"
    },
    initialize: function () {
        // this.listenTo(Transcendence.chats, 'sync', this.render);
        this.listenTo(Transcendence.chatrooms, 'sync', function () {
            this.model = Transcendence.chatrooms.get(this.id).toJSON()
            this.$('#members-content').empty();
            this.members();
        });
        this.listenTo(Transcendence.chatrooms, 'remove', this.render);
    },
    render: function () {
        if (!Transcendence.chatrooms.get(this.id)) {
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
            this.$el.html(JST['templates/chatrooms/chatroom']({ chatroom: this.model }));
            this.members();
            var msgs = JST['templates/chatrooms/messages']({ chats: this.collection });
            this.$('#messages').append(msgs);
            var flashMsg = JST['templates/chatrooms/flash_messages']({ chatroom: this.model });
            this.$('#flash-messages').append(flashMsg);
            setTimeout(function () {
                let userId = $('.current_user_id').data('userid')
                sessionStorage.setItem("chat_userid", userId)
                let roomId = $('.current_chatroom_id').data('roomid')
                sessionStorage.setItem("chat_roomid", roomId)
            })
        }
        return this;
    },
    members: function () {
        var members = JST['templates/chatrooms/members']({ chatroom: this.model });
        this.$('#members-content').append(members);
    },
    menu: function (e) {
        $(e.currentTarget).next(e.currentTarget.nextElementSibling).slideToggle(300);
    }
});

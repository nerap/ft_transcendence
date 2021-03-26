Transcendence.Views.ChatroomShow = Backbone.View.extend({
    events: {
        "click .member-name, .member-owner, .member-admin": "menu",
    },
    initialize: function () {
        // this.listenTo(Transcendence.chats, 'sync', this.render);
        // this.listenTo(Transcendence.chatrooms, 'remove', function () {
            // Transcendence.chats.fetch();
            // location.hash = "#chatrooms/public"
            // this.model = undefined;
            // this.render();
        // });
        this.listenTo(Transcendence.chatrooms, 'sync', function () {
            if (Transcendence.chatrooms.get(this.id)) {
                this.model = Transcendence.chatrooms.get(this.id).toJSON()
                this.$('#members').empty();
                this.members();
            } else {
                this.remove();
                location.hash = "#chatrooms/public"
            }
        });
    },
    render: function () {
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
        return this;
    },
    members: function () {
        var members = JST['templates/chatrooms/members']({ chatroom: this.model });
        this.$('#members').append(members);
    },
    menu: function (e) {
        $(e.currentTarget).next(e.currentTarget.nextElementSibling).slideToggle(300);
    },
});

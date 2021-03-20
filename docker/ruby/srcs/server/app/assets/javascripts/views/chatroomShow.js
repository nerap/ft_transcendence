Transcendence.Views.ChatroomShow = Backbone.View.extend({
    events: {
        "click .flash-button-link": "modal",
        "click .member-name, .member-owner, .member-admin": "menu"
    },
    initialize: function () {
        // this.listenTo(Transcendence.chats, 'sync', this.render);
        this.listenTo(Transcendence.chatrooms, 'sync', function () {
            this.model = Transcendence.chatrooms.get(this.id).toJSON()
            this.$('#members-content').empty();
            this.members();
        });
    },
    render: function () {
        this.$el.html(JST['templates/chatrooms/chatroom']({ chatroom: this.model }));
        this.members();
        var msgs = JST['templates/chatrooms/messages']({ chats: this.collection });
        this.$('#messages').append(msgs);
        setTimeout(function () {
            let userId = $('.current_user_id').data('userid')
            sessionStorage.setItem("chat_userid", userId)
            let roomId = $('.current_chatroom_id').data('roomid')
            sessionStorage.setItem("chat_roomid", roomId)
        })
        return this
    },
    members: function () {
        var members = JST['templates/chatrooms/members']({ chatroom: this.model });
        this.$('#members-content').append(members);
    },
    modal: function () {
        this.currentTarget.ParentNode.ParentNode.ParentNode.style.display = "none";
    },
    menu: function (e) {
        $(e.currentTarget).next(e.currentTarget.nextElementSibling).slideToggle(300);
    }
});

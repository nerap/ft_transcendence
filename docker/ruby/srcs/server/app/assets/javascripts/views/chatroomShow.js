Transcendence.Views.ChatroomShow = Backbone.View.extend({
    events: {
        "click .member-name, .member-owner, .member-admin": "menu",
        "click #send-pm": "sendPM"
    },
    initialize: function () {
        this.listenTo(Transcendence.chatrooms.get(this.id), 'change:members change:admin change:muted remove', function () {
            if (!Transcendence.chatrooms.get(this.id)) {
                this.remove();
                location.hash = "#chatrooms/public";
            } else {
                this.model = Transcendence.chatrooms.get(this.id);
                this.$('#members').empty();
                this.members();
            }
        });
        this.listenTo(Transcendence.current_user, 'sync', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/chatrooms/chatroom']({ chatroom: this.model.toJSON() }));
        this.members();
        var msgs = JST['templates/chatrooms/messages']({ chat: this.model.toJSON().chat });
        this.$('#messages').append(msgs);
        var flashMsg = JST['templates/chatrooms/flash_messages']({ chatroom: this.model.toJSON() });
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
        var members = JST['templates/chatrooms/members']({ chatroom: this.model.toJSON() });
        this.$('#members').append(members);
    },
    menu: function (e) {
        if (Transcendence.current_user.toJSON().id != $(e.currentTarget).attr('id'))
            $(e.currentTarget).next(e.currentTarget.nextElementSibling).slideToggle(300);
    },
    sendPM: function (e) {
        var pr1 = Transcendence.private_rooms.findWhere({
            user1: Transcendence.current_user.id,
            user2: parseInt($(e.currentTarget).attr('class'))
        })
        var pr2 = Transcendence.private_rooms.findWhere({
            user1: parseInt($(e.currentTarget).attr('class')),
            user2: Transcendence.current_user.id
        })
        if (pr1) {
            location.hash = "#private_rooms/" + pr1.id;
        } else if (pr2) {
            location.hash = "#private_rooms/" + pr2.id;
        }
    }
});

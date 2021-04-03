Transcendence.Views.ChatroomShow = Backbone.View.extend({
    events: {
        "click .member-name, .member-owner, .member-admin": "menu",
        "click #send-pm": "sendPM"
    },
    initialize: function () {
        this.listenTo(this.model, "change:chat add:chat", function () {
            this.$('#messages').empty();
            var msgs = JST['templates/chatrooms/messages']({ chat: this.model.toJSON().chat });
            this.$('#messages').append(msgs);
        });
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
            // let userId = $('.current_user_id').data('userid')
            // sessionStorage.setItem("chat_userid", userId)
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
        pr = Transcendence.private_rooms.find(function (pr) {
            return (pr.toJSON().users.includes(Transcendence.current_user.id)
            && pr.toJSON().users.includes(parseInt($(e.currentTarget).attr('class'))));
        });
        if (pr) {
            location.hash = "#private_rooms/" + pr.id;
        }
    }
});

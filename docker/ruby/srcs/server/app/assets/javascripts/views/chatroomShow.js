Transcendence.Views.ChatroomShow = Backbone.View.extend({
    events: {
        "click .flash-button-link": "modal"
    },
    // initialize: function () {
        // this.listenTo(Transcendence.chats, 'sync', this.render);
    // },
    render: function () {
        this.$el.html(JST['templates/chatrooms/chatroom']({ chatroom: this.model }));
        var msg = JST['templates/chatrooms/messages']({ chats: this.collection });
        this.$('#messages').append(msg);
        setTimeout(function () {
            var element = document.getElementById('messages');
            element.scrollTop = element.scrollHeight - element.clientHeight;
            let userId = $('.current_user_id').data('userid')
            sessionStorage.setItem("chat_userid", userId)
            let roomId = $('.current_chatroom_id').data('roomid')
            sessionStorage.setItem("chat_roomid", roomId)
        })
        return this
    },
    modal: function () {
        this.currentTarget.ParentNode.ParentNode.ParentNode.style.display = "none";
    },
});

Transcendence.Views.ChatroomNew = Backbone.View.extend({
    events: {
        "submit #create-chatroom": "create"
    },
    create: function () {
        location.hash = "#chatrooms/public"
    },
    render: function () {
        this.$el.html(JST['templates/chatrooms/new_panel']());
        return this
    },
});

Transcendence.Views.ChatroomNew = Backbone.View.extend({
    render: function () {
        this.$el.html(JST['templates/chatrooms/new_panel']());
        return this
    },
});

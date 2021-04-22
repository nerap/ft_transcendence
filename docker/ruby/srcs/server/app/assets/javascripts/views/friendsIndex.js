Transcendence.Views.FriendsIndex = Backbone.View.extend ({
    initialize: function () {
        this.listenTo(Transcendence.current_user, 'change', this.render);
        this.listenTo(Transcendence.friends, 'change add remove', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/friends/index']());
        return this
    },
});
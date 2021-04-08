Transcendence.Views.UserProfile = Backbone.View.extend ({
    initialize: function () {
        this.listenTo(Transcendence.current_user, 'change', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/users/profile']({ user: this.model.toJSON() }));
        return this;
    }
});

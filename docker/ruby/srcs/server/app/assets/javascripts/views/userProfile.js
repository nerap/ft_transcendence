Transcendence.Views.UserProfile = Backbone.View.extend ({
    render: function () {
        this.$el.html(JST['templates/users/profile']({ user: this.model.toJSON() }));
        return this;
    }
});

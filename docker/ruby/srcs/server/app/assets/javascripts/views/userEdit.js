Transcendence.Views.UserEdit = Backbone.View.extend ({
    render: function () {
        this.$el.html(JST['templates/users/edit_profile']({ user: this.model.toJSON() }));
        return this;
    }
});

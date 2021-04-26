Transcendence.Views.UserAccount = Backbone.View.extend ({
    render: function () {
        this.$el.html(JST['templates/users/edit_account']({ user: this.model.toJSON() }));
        return this;
    }
});

Transcendence.Views.UsersIndex = Backbone.View.extend ({
    render: function () {
        this.$el.html(JST['templates/users/index']());
        return this
    }
});
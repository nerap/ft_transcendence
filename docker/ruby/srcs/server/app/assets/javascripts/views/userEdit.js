Transcendence.Views.UserEdit = Backbone.View.extend ({
    render: function () {
        $(".nav-option").removeClass("active")
        $(".option-user").addClass("active")
        this.$el.html(JST['templates/users/edit_profile']({ user: this.model.toJSON() }));
        return this;
    }
});

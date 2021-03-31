Transcendence.Views.HomeIndex = Backbone.View.extend ({
    render: function () {
        this.$el.html(JST['templates/home/index']());
        return this
    }
});

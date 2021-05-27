Transcendence.Views.GamesIndex = Backbone.View.extend ({
    initialize: function () {
    },
    render: function () {
        this.$el.html(JST['templates/games/index']());
        return this
    },
});
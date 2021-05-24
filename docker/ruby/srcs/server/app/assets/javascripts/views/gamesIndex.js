Transcendence.Views.GamesIndex = Backbone.View.extend ({
    initialize: function () {
        this.listenTo(Transcendence.current_user, 'add remove', this.render);
        this.listenTo(Transcendence.users, 'add remove', this.render);
        this.listenTo(Transcendence.guilds, 'add remove', this.render);
        this.listenTo(Transcendence.games, 'add remove', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/games/index']());
        return this
    },
});
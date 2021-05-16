Transcendence.Views.PongsGame = Backbone.View.extend ({
    initialize: function () {
        this.listenTo(Transcendence.current_user, 'change add remove', this.render);
        this.listenTo(Transcendence.users, 'change add remove', this.render);
        this.listenTo(Transcendence.guilds, 'change add remove', this.render);
        this.listenTo(Transcendence.games, 'change add remove', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/pongs/pong']());
        return this
    },
});
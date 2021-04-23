Transcendence.Views.GuildWarsIndex = Backbone.View.extend ({
    initialize: function () {
        this.listenTo(Transcendence.users, 'change add remove', this.render);
        this.listenTo(Transcendence.guilds, 'change add remove', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/guild_wars/index']());
        return this
    },

});
Transcendence.Views.GuildWars = Backbone.View.extend ({
    initialize: function () {
        this.listenTo(Transcendence.users, 'change add remove', this.render);
        this.listenTo(Transcendence.guilds, 'change add remove', this.render);
        this.listenTo(Transcendence.guild_wars, 'change add remove', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/guilds/guild_wars']({ guild: this.model.toJSON() }));
        this.$('.guilds-sidenav').append(JST['templates/guilds/guilds_sidenav']());
        return this
    },

});
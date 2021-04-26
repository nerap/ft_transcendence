Transcendence.Views.GuildWarsNew = Backbone.View.extend ({

    render: function () {
        this.$el.html(JST['templates/guild_wars/new']());
        return this
    },

});
Transcendence.Routers.GuildWars = Backbone.Router.extend({
    routes: {
        "guild_wars": "index",
    },
    initialize: function () {
        this.view = null;
    },
    cleanUp: function () {
        if (this.view)
            this.view.remove();
        this.view = null;
    },
    index: function () {
        this.cleanUp();
        this.view = new Transcendence.Views.GuildWarsIndex({ collection: Transcendence.guildwars });
        $('#main-body').html(this.view.render().$el);
    },
});
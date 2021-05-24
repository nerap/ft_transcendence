Transcendence.Routers.GuildWars = Backbone.Router.extend({
    routes: {
        "guild_wars/new": "new",
        "guild_wars/new/:id": "new_war",
    },
    initialize: function () {
        this.view = null;
    },
    cleanUp: function () {
        setInterval(() => {$.ajax({
            url: '/api/guild_wars/',
            type: 'get',
            success: function(response)
            {
            }
        });}, 60000);
        if (this.view)
            this.view.remove();
        this.view = null;
    },
    history: function (id) {
        if (!Transcendence.guilds.get(id)) {
            location.hash = "#guilds";
            flashMessage("error", "This guild doesn't exist !");
        } else {
            this.cleanUp();
            this.view = new Transcendence.Views.GuildWarsHistory({
                model: Transcendence.guilds.get(id),
                id: id
            });
            $('#main-body').html(this.view.render().$el);
        }
    },
    new: function () {
        this.cleanUp();
        this.view = new Transcendence.Views.GuildWarsNew();
        $('#main-body').html(this.view.render().$el);
    },
    new_war: function (id) {
        if (!Transcendence.guilds.get(id)) {
            location.hash = "#guilds";
            flashMessage("error", "This guild doesn't exist !");
        } else {
            this.cleanUp();
            this.view = new Transcendence.Views.GuildWarsNewWar({
                model: Transcendence.guilds.get(id),
                id: id
            });
            $('#main-body').html(this.view.render().$el);
        }
    },
});
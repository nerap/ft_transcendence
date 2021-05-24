Transcendence.Routers.Guilds = Backbone.Router.extend({
    routes: {
        "guilds": "index",
        "guilds/:id": "guild",
        "guilds/:id/wars": "wars",
        "guilds/:id/wars/new": "newWar"
    },
    initialize: function () {
        this.view = null;
    },
    cleanUp: function () {
        setInterval(() => {
            $.ajax({
                url: '/api/guild_wars/',
                type: 'get',
                success: function (response) {
                }
            });
        }, 60000);
        if (this.view)
            this.view.remove();
        this.view = null;
    },
    index: function () {
        this.cleanUp();
        this.view = new Transcendence.Views.GuildsIndex({ collection: Transcendence.guilds });
        $('#main-body').html(this.view.render().$el);
    },
    guild: function (id) {
        if (!Transcendence.guilds.get(id)) {
            location.hash = "#guilds";
            flashMessage("error", "This guild doesn't exist !");
        } else {
            this.cleanUp();
            this.view = new Transcendence.Views.GuildsPanel({
                model: Transcendence.guilds.get(id),
                id: id
            });
            $('#main-body').html(this.view.render().$el);
        }
    },
    wars: function (id) {
        this.cleanUp();
        this.view = new Transcendence.Views.GuildWars({
            model: Transcendence.guilds.get(id),
            id: id
        });
        $('#main-body').html(this.view.render().$el);
    },
    newWar: function (id) {
        this.cleanUp();
        this.view = new Transcendence.Views.GuildWarsNew({
            model: Transcendence.guilds.get(id),
            id: id
        });
        $('#main-body').html(this.view.render().$el);
    }
});
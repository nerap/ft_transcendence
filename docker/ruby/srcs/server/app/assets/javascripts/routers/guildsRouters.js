Transcendence.Routers.Guilds = Backbone.Router.extend({
    routes: {
        "guilds": "index",
        "guilds/new": "new",
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
        this.view = new Transcendence.Views.GuildsIndex({ collection: Transcendence.guilds });
        $('#main-body').html(this.view.render().$el);
    },
    new: function () {
        this.cleanUp();
        this.view = new Transcendence.Views.GuildsNew();
        $('#main-body').html(this.view.render().$el);
    },
});
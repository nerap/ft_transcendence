Transcendence.Routers.Guilds = Backbone.Router.extend({
    routes: {
        "guilds": "index",
    },
    initialize: function () {
        this.listenTo(Transcendence.guilds, 'change add remove', this.render);
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
});
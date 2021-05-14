Transcendence.Routers.Games = Backbone.Router.extend({
    routes: {
        "games": "index",
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
        });}, 20000);
        if (this.view)
            this.view.remove();
        this.view = null;
    },
    index: function () {
        this.cleanUp();
        this.view = new Transcendence.Views.GamesIndex({ collection: Transcendence.games });
        $('#main-body').html(this.view.render().$el);
    },
});
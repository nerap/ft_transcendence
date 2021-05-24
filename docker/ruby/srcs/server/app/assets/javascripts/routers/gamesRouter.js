Transcendence.Routers.Games = Backbone.Router.extend({
    routes: {
        "games": "index",
        "games/:id": "game",
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
        this.view = new Transcendence.Views.GamesIndex({ collection: Transcendence.games });
        $('#main-body').html(this.view.render().$el);
    },
    game: function (id) {
        if (!Transcendence.games.get(id)) {
            location.hash = "#games";
            flashMessage("error", "This game doesn't exist !");
        } else {
            this.cleanUp();
            this.view = new Transcendence.Views.GamesGame({
                model: Transcendence.games.get(id),
                collection: Transcendence.games,
                id: id
            });
            $('#main-body').html(this.view.render().$el);
        }
    },
});
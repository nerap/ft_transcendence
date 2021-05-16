Transcendence.Routers.Pongs = Backbone.Router.extend({
    routes: {
        "pongs/:id": "pong",
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
    pong: function (id) {
        if (!Transcendence.pongs.get(id)) {
            location.hash = "#games";
            flashMessage("error", "This game doesn't exist !");
        } else {
            this.cleanUp();
            this.view = new Transcendence.Views.PongsGame({
                model: Transcendence.pongs.get(id),
                id: id
            });
            $('#main-body').html(this.view.render().$el);
        }
    },
});
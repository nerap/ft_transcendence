Transcendence.Routers.Home = Backbone.Router.extend({
    routes: {
        "": "index",
        "*path": "error"
    },

    index: function () {
        var viewIndex = new Transcendence.Views.HomeIndex();
        $('#main-body').html(viewIndex.render().$el);
    },
    error: function () {
        $('#main-body').html(JST['templates/home/404']());
    }
});

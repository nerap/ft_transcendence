Transcendence.Routers.Home = Backbone.Router.extend({
    routes: {
        "": "index",
    },

    index: function() {
        var viewIndex = new Transcendence.Views.HomeIndex();
        $('#main-body').html(viewIndex.render().$el);
    },
});

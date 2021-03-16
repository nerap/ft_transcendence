Transcendence.Routers.Users = Backbone.Router.extend({
    routes: {
        "users": "index",
    },

    index: function() {
        var viewIndex = new Transcendence.Views.UsersIndex({ collection: Transcendence.users });
        $('#main-body').html(viewIndex.render().$el);
    },
});
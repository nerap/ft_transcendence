Transcendence.Routers.Users = Backbone.Router.extend({
    routes: {
        "users": "index",
        "users/:id": "profile",
    },

    index: function() {
        var viewIndex = new Transcendence.Views.UsersIndex({ collection: Transcendence.users });
        $('#main-body').html(viewIndex.render().$el);
    },
    profile: function (id) {
        var viewProfile = new Transcendence.Views.UserProfile({ model: Transcendence.users.get(id) });
        $('#main-body').html(viewProfile.render().$el);
    }
});
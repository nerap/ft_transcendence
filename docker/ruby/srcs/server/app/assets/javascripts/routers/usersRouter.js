Transcendence.Routers.Users = Backbone.Router.extend({
    routes: {
        "users": "index",
        "users/:id": "profile",
    },
    initialize: function () {
        this.view = null;
    },
    cleanUp: function () {
        if (this.view)
            this.view.remove();
        this.view = null;
    },
    index: function() {
        this.cleanUp();
        this.view = new Transcendence.Views.UsersIndex({ collection: Transcendence.users });
        $('#main-body').html(this.view.render().$el);
    },
    profile: function (id) {
        this.cleanUp();
        this.view = new Transcendence.Views.UserProfile({ model: Transcendence.users.get(id) });
        $('#main-body').html(this.view.render().$el);
    }
});
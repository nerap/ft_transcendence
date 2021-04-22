Transcendence.Routers.Friends = Backbone.Router.extend({
    routes: {
        "friends": "index",
    },
    initialize: function () {
        this.listenTo(Transcendence.friends, 'change add remove', this.render);
    },
    cleanUp: function () {
        if (this.view)
            this.view.remove();
        this.view = null;
    },
    index: function () {
        this.cleanUp();
        this.view = new Transcendence.Views.FriendsIndex({ collection: Transcendence.friends });
        $('#main-body').html(this.view.render().$el);
    },
});

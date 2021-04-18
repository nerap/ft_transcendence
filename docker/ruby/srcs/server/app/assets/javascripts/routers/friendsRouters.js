Transcendence.Routers.Friends = Backbone.Router.extend({
    routes: {
        "friends": "index",
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
    },
});

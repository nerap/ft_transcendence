Transcendence.Routers.GuildInvitations = Backbone.Router.extend({
    routes: {
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
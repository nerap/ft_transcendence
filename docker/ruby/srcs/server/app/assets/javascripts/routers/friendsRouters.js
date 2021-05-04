Transcendence.Routers.Friends = Backbone.Router.extend({
    routes: {
        "friends": "index",
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
    index: function () {
        this.cleanUp();
        this.view = new Transcendence.Views.FriendsIndex({ collection: Transcendence.friends });
        $('#main-body').html(this.view.render().$el);
    },
});

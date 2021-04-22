Transcendence.Views.GuildsIndex = Backbone.View.extend ({
    initialize: function () {
        this.listenTo(Transcendence.current_user, 'change add remove', this.render);
        this.listenTo(Transcendence.users, 'change add remove', this.render);
        this.listenTo(Transcendence.guilds, 'change add remove', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/guilds/index']());
        if (!Transcendence.current_user.toJSON().guild) {
            var guildsView = JST['templates/guilds/list_guilds']();
        } else {
            var guildsView = JST['templates/guilds/current_guilds']();
        }
        this.$('.guilds-list').append(guildsView);
        return this
    },

});
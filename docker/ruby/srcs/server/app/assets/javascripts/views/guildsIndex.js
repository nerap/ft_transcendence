Transcendence.Views.GuildsIndex = Backbone.View.extend ({
    initialize: function () {
        this.listenTo(Transcendence.current_user, 'change', this.render);
        this.listenTo(Transcendence.guilds, 'change add remove', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/guilds/index']());
        return this
    },
});
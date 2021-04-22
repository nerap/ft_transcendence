Transcendence.Views.GuildsNew = Backbone.View.extend ({

    render: function () {
        this.$el.html(JST['templates/guilds/new']());
        return this
    },

});
Transcendence.Views.GuildsPanel = Backbone.View.extend ({
    
    initialize: function () {
        this.listenTo(Transcendence.users, 'change add remove', this.render);
        this.listenTo(Transcendence.guilds, 'change add remove', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/guilds/panel']({ guild: this.model.toJSON() }));
        return this
    },

});
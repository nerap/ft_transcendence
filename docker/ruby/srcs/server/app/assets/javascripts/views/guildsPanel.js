Transcendence.Views.GuildsPanel = Backbone.View.extend({
    initialize: function () {
        this.listenTo(Transcendence.users, 'change:username change:guild change:officer change:member add remove', this.render);
        this.listenTo(Transcendence.guilds, 'change add remove', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/guilds/panel']({ curguild: this.model.toJSON() }));
        return this;
    }
});
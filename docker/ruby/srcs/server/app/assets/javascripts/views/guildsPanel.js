Transcendence.Views.GuildsPanel = Backbone.View.extend({
    initialize: function () {
        this.listenTo(Transcendence.users, 'change:username change:guild change:officer change:member add remove', this.render);
        this.listenTo(Transcendence.guilds, 'change add remove', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/guilds/panel']({
            curguild: this.model.toJSON(),
            guildwars: Transcendence.guild_wars.where({done: true})
        }));
        var guildMembers = JST['templates/guilds/guild_members']({ curguild: this.model.toJSON() });
        this.$('#guild-members').append(guildMembers);
        return this;
    }
});
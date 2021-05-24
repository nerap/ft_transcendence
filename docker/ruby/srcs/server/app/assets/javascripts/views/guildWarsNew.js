Transcendence.Views.GuildWarsNew = Backbone.View.extend ({
    events: {
        "click .other-guild-option": "selectGuild"
    },
    initialize: function () {
        this.listenTo(Transcendence.guilds, 'change add remove', this.render);
        this.listenTo(Transcendence.guild_wars, 'change add remove', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/guilds/new_war']({ guild: this.model.toJSON() }));
        return this
    },
    selectGuild: function (e) {
        var guildid = $(e.target).attr("class").split(' ')[1];
        $(".input-other-guild").attr("value", guildid);
        $(".other-guild-option").removeClass("active")
        $(e.target).addClass("active")
    }
});
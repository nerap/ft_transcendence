Transcendence.Views.UsersIndex = Backbone.View.extend ({
    events: {
        "click #send-pm": "sendPM"
    },
    initialize: function () {
        this.listenTo(Transcendence.users, "change:online", this.render)
        this.listenTo(Transcendence.guild_invitations, 'change add remove', this.render);
        this.listenTo(Transcendence.guilds, 'change add remove', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/users/index']());
        return this
    },
    sendPM: function (e) {
        pr = Transcendence.private_rooms.find(function (pr) {
            return (pr.toJSON().users.includes(Transcendence.current_user.id)
            && pr.toJSON().users.includes(parseInt($(e.currentTarget).attr('class'))));
        });
        if (pr) {
            location.hash = "#private_rooms/" + pr.id;
        }
    }
});
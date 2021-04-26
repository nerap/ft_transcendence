Transcendence.Views.UserProfile = Backbone.View.extend ({
    events: {
        "click #send-pm": "sendPM"
    },
    initialize: function () {
        this.listenTo(Transcendence.users, 'change', this.render);
        this.listenTo(Transcendence.current_user, 'change', this.render);
        this.listenTo(Transcendence.friends, 'change add remove', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/users/profile']({ user: this.model.toJSON() }));
        return this;
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

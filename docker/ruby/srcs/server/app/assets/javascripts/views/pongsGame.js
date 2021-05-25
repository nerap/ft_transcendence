Transcendence.Views.PongsGame = Backbone.View.extend ({
    initialize: function () {
        this.listenTo(Transcendence.current_user, 'change add remove', this.render);
        this.listenTo(Transcendence.users, 'change add remove', this.render);
        this.listenTo(Transcendence.guilds, 'add remove', this.render);
        this.listenTo(Transcendence.games, 'change add remove', this.render);
        this.listenTo(Transcendence.pongs, 'change add remove', this.render);
    },
    render: function () {
        if (Transcendence.current_user.toJSON().pong == 0)
        {
            location.hash = "#games"
            return
        }
        pong = this.collection.findWhere({room_id: parseInt(this.id)}).toJSON(),
        this.$el.html(JST['templates/pongs/pong']({
            user_left: Transcendence.users.findWhere({id: pong.user_left_id}).toJSON(),
            user_right: Transcendence.users.findWhere({id: pong.user_right_id}).toJSON(),
        }));
        return this
    },
});
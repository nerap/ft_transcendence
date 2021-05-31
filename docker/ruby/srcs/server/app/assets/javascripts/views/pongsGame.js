Transcendence.Views.PongsGame = Backbone.View.extend ({
    initialize: function () {
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
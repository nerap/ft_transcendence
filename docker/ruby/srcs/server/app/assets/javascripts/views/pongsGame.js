Transcendence.Views.PongsGame = Backbone.View.extend ({
    initialize: function () {
        this.listenTo(Transcendence.current_user, 'change', this.render);
    },
    render: function () {
        if (Transcendence.current_user.toJSON().pong == 0 || this.id == 0)
        {
            this.remove();
            location.hash = "#games";
            return;
        }
        console.log(this.id)
        console.log(this.collection.findWhere({room_id: parseInt(this.id)}))
        setTimeout(() => {
        pong = this.collection.findWhere({room_id: parseInt(this.id)}).toJSON()
        this.$el.html(JST['templates/pongs/pong']({
            user_left: Transcendence.users.findWhere({id: pong.user_left_id}).toJSON(),
            user_right: Transcendence.users.findWhere({id: pong.user_right_id}).toJSON(),
        }));
        }, 200);
        return this;
    },
});
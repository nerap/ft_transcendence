Transcendence.Views.PrivateRoomsIndex = Backbone.View.extend({
    events: {
    },
    initialize: function () {
        this.listenTo(Transcendence.private_rooms, "add remove", this.render);
    },
    render: function () {
        var prs = this.collection.filter(function(pr){
            return pr.toJSON().users.includes(Transcendence.current_user.id);
        });
        this.$el.html(JST['templates/private_rooms/index']({ prs: prs }));
        return this;
    },
});

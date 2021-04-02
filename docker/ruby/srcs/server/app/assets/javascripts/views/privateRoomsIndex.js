Transcendence.Views.PrivateRoomsIndex = Backbone.View.extend({
    events: {
    },
    initialize: function () {
        // this.listenTo(this.model, "change add remove", function () {
        //     this.$('#private-messages').empty();
        //     var pms = JST['templates/private_rooms/private_messages']({ pm: this.model.toJSON().private_message });
        //     this.$('#private-messages').append(pms);
        // });
    },
    render: function () {
        var prs = this.collection.filter(function(pr){
            return pr.toJSON().users.includes(Transcendence.current_user.id);
        });
        this.$el.html(JST['templates/private_rooms/index']({ prs: prs }));
        return this;
    },
});

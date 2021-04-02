Transcendence.Views.PrivateRoomShow = Backbone.View.extend({
    events: {
    },
    initialize: function () {
        this.listenTo(this.model, "change add remove", function () {
            this.$('#private-messages').empty();
            var pms = JST['templates/private_rooms/private_messages']({ pm: this.model.toJSON().private_message });
            this.$('#private-messages').append(pms);
        });
    },
    render: function () {
        this.$el.html(JST['templates/private_rooms/private_room']({ pr: this.model.toJSON() }));
        var pms = JST['templates/private_rooms/private_messages']({ pm: this.model.toJSON().private_message });
        this.$('#private-messages').append(pms);
        return this;
    },
});
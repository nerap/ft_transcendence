Transcendence.Views.PrivateRoomShow = Backbone.View.extend({
    events: {
    },
    initialize: function () {
    },
    render: function () {
        this.$el.html(JST['templates/private_rooms/private_room']({ pr: this.model.toJSON() }));
        var pms = JST['templates/private_rooms/private_messages']({ pm: this.model.toJSON().private_message });
        this.$('#private-messages').append(pms);
        return this;
    },
});
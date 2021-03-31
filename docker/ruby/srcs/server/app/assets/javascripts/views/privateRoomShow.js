Transcendence.Views.PrivateRoomShow = Backbone.View.extend({
    events: {
    },
    initialize: function () {
    },
    render: function () {
        this.$el.html(JST['templates/private_rooms/private_room']({ pr: this.model.toJSON() }));
        return this;
    },

});
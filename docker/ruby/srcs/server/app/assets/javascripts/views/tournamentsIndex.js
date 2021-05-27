Transcendence.Views.TournamentsIndex = Backbone.View.extend({
    events: {
    },
    initialize: function () {
        this.listenTo(this.collection, 'change add remove', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/games/tournaments']({}));
        return this;
    }
});

Transcendence.Routers.PrivateRooms = Backbone.Router.extend({
    routes: {
        "private_rooms": "index",
        "private_rooms/:id": "show",
    },
    initialize: function () {
        this.view = null;
    },
    cleanUp: function () {
        if (this.view)
            this.view.remove();
        this.view = null;
    },
    index: function () {
        this.cleanUp();
        this.view = new Transcendence.Views.PrivateRoomsIndex({ collection: Transcendence.private_rooms });
        $('#main-body').html(this.view.render().$el);
    },
    show: function (id) {
        if (!Transcendence.private_rooms.get(id)) {
            location.hash = "#private_rooms";
            var flash = `<div class="error">` +
                `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>` +
                `This page doesn't exist !` +
                `</div>`
            $("#flash-message").append(flash);
            setTimeout(function () {
                $(`.error`).slideUp(500);
            }, 3000);
        } else {
            this.cleanUp();
            this.view = new Transcendence.Views.PrivateRoomShow({
                model: Transcendence.private_rooms.get(id),
                id: id
            });
            $('#main-body').html(this.view.render().$el);
        }
    }
});
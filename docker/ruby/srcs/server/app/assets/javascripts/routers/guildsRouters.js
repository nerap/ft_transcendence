Transcendence.Routers.Guilds = Backbone.Router.extend({
    routes: {
        "guilds": "index",
        "guilds/new": "new",
        "guilds/:id": "guild",
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
        this.view = new Transcendence.Views.GuildsIndex({ collection: Transcendence.guilds });
        $('#main-body').html(this.view.render().$el);
    },
    new: function () {
        this.cleanUp();
        this.view = new Transcendence.Views.GuildsNew();
        $('#main-body').html(this.view.render().$el);
    },
    guild: function (id) {
        if (!Transcendence.guilds.get(id)) {
            location.hash = "#guilds";
            var flash = `<div class="error">` +
                `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>` +
                `This guild doesn't exist !` +
                `</div>`
            $("#flash-message").append(flash);
            setTimeout(function () {
                $(`.error`).slideUp(500);
            }, 3000);
        } else {
            this.cleanUp();
            this.view = new Transcendence.Views.GuildsPanel({
                model: Transcendence.guilds.get(id),
                id: id
            });
            $('#main-body').html(this.view.render().$el);
        }
    },
});
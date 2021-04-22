Transcendence.Routers.Home = Backbone.Router.extend({
    routes: {
        "": "index",
        "admin_panel": "admin",
        "*path": "error"
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
        this.view = new Transcendence.Views.HomeIndex();
        $('#main-body').html(this.view.render().$el);
    },
    admin: function () {
        if (Transcendence.current_user.toJSON().superuser == false && Transcendence.current_user.toJSON().admin == false) {
            location.hash = "#";
            var flash = `<div class="error">` +
                `<span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>` +
                `You are not an administrator` +
                `</div>`
            $("#flash-message").append(flash);
            setTimeout(function () {
                $(`.error`).slideUp(500);
            }, 3000);
        } else {
            this.cleanUp();
            this.view = new Transcendence.Views.HomeAdmin();
            $('#main-body').html(this.view.render().$el);
        }
    },
    error: function () {
        $('#main-body').html(JST['templates/home/404']());
    }
});

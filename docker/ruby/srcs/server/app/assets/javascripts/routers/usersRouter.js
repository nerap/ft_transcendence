Transcendence.Routers.Users = Backbone.Router.extend({
    routes: {
        "users": "index",
        "users/:id": "profile",
        "users/:id/edit_profile": "edit"
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
        this.view = new Transcendence.Views.UsersIndex({ collection: Transcendence.users });
        $('#main-body').html(this.view.render().$el);
    },
    profile: function (id) {
        if (!Transcendence.users.get(id)) {
            location.hash = "#users";
            flashMessage("error", "This user doesn't exist !");
        } else {
            this.cleanUp();
            this.view = new Transcendence.Views.UserProfile({
                model: Transcendence.users.get(id),
                id: id
            });
            $('#main-body').html(this.view.render().$el);
        }
    },
    edit: function (id) {
        if (!Transcendence.users.get(id)) {
            location.hash = "#users";
            flashMessage("error", "This user doesn't exist !");
        } else {
            if (Transcendence.current_user.id == Transcendence.users.get(id).toJSON().id) {
                this.cleanUp();
                this.view = new Transcendence.Views.UserEdit({ model: Transcendence.users.get(id) });
                $('#main-body').html(this.view.render().$el);
            } else {
                location.hash = "#users";
                flashMessage("error", "You are not authorized to access this page !");
            }
        }
    }
});
Transcendence.Views.HomeAdmin = Backbone.View.extend({
    initialize: function () {
        this.listenTo(Transcendence.users, 'change:admin change:banned', this.render);
    },
    render: function () {
        if (Transcendence.current_user.superuser == false && Transcendence.current_user.admin == false) {
            this.remove();
            location.hash = "#";
        } else {
            this.$el.html(JST['templates/home/admin_panel']({
                members: Transcendence.users.toJSON(),
                admins: Transcendence.users.where({ admin: true }),
                banned: Transcendence.users.where({ banned: true })
            }));
            return this;
        }
    }
});

Transcendence.Views.HomeAdmin = Backbone.View.extend({
    events: {
        // "submit #enable-2fa": "enable2fa"
    },
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
    },
    // enable2fa: function (e) {
    //     e.preventDefault();
    //     e.stopImmediatePropagation();
    //     $.ajax({
    //         type: "PUT",
    //         url: "/api/users/enable_2fa",
    //         data: new FormData($("#enable-2fa")[0]),
    //         dataType: "json",
    //         encode: true,
    //         processData: false,
    //         contentType: false,
    //     }).done(data => {
    //         Transcendence.current_user.set({ otp_required_for_login: true });
    //         Transcendence.otp_uri = data.otp_uri;
    //         this.render();
    //     });
    // }
});

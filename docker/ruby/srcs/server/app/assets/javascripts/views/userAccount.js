Transcendence.Views.UserAccount = Backbone.View.extend({
    events: {
        "submit #enable-2fa": "enable2fa"
    },
    render: function () {
        this.$el.html(JST['templates/users/edit_account']({ user: this.model.toJSON() }));
        return this;
    },
    enable2fa: function () {
        $.ajax({
            type: "PUT",
            url: "/api/users/enable_2fa",
            data: new FormData($("#enable-2fa")[0]),
            dataType: "json",
            encode: true,
            processData: false,
            contentType: false,
        }).done(data => {
            this.model.set({ otp_required_for_login: true });
            Transcendence.otp_uri = data.otp_uri;
        });
    }
});

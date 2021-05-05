Transcendence.Views.HomeIndex = Backbone.View.extend ({
    events : {
        "click .unset-firsttime": "unset"
    },
    render: function () {
        this.$el.html(JST['templates/home/index']());
        return this;
    },
    unset: function (e) {
        $.ajax({
            type: "PUT",
            url: "/api/users/unset_ft",
            dataType: "json",
            encode: true,
            processData: false,
            contentType: false,
        }).done(data => {
            Transcendence.current_user.set({first_time: false});
            $("#firsttime-modal").hide();
        });
    },
});

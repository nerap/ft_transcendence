Transcendence.Views.ChatroomsIndex = Backbone.View.extend({
    events: {
        // "click .tab-content-list-join-link": 'join',
        // "click .tab-content-list-unjoin-link": 'unjoin',
        "click #tab-content-private": 'modal',
    },
    initialize: function () {
        this.listenTo(this.collection, 'sync', this.render);
    },
    render: function () {
        this.$el.html(JST['templates/chatrooms/index']());
        if (window.location.hash == "#chatrooms/public" || window.location.hash == "#chatrooms") {
            var chatroomView = JST['templates/chatrooms/public']();
        } else if (window.location.hash == "#chatrooms/private") {
            var chatroomView = JST['templates/chatrooms/private']();
        }
        this.$('.chatrooms-list').append(chatroomView);
        return this
    },
    modal: function (e) {
        var a = e.currentTarget.getAttribute("data-id");
        var elem = "#password-modal-" + a;
        var close = ".close-" + a;
        var mod = document.querySelector(elem);
        mod.style.display = "block";
        var closemod = document.querySelector(close);
        closemod.addEventListener('click', function (e) {
            mod.style.display = "none";
        });
        window.addEventListener('click', function (e) {
            if (e.target == mod) {
                mod.style.display = "none";
            }
        })
    },
    // join: function (e) {
    //     e.currentTarget.parentNode.classList.remove('active')
    //     e.currentTarget.parentNode.nextElementSibling.classList.add('active')
    // },
    // unjoin: function (e) {
    //     e.currentTarget.parentNode.classList.remove('active')
    //     e.currentTarget.parentNode.previousElementSibling.classList.add('active')
    // },
});

// (function () {
    // var displayTab = function (a) {
    //     var li = a.parentNode
    //     var div = a.parentNode.parentNode.parentNode
    //     if (li.classList.contains('active')) {
    //         return false
    //     }
    //     div.querySelector('.tabs .active').classList.remove('active')
    //     li.classList.add('active')

    //     div.querySelector(".tab-content.active").classList.remove('active')
    //     div.querySelector(a.getAttribute('href')).classList.add('active')
    // }

    // var tabs = document.querySelectorAll('.tabs a')
    // for (var i = 0; i < tabs.length; i++) {
    // tabs[i].addEventListener('click', function (e) {
    // console.log("1")
    // displayTab(this)
    // })
    // }

    // var hashChange = function (e) {
    //     var hash = window.location.hash
    //     var a = document.querySelector('a[href="' + hash + '"]')
    //     if (a !== null && !a.classList.contains('active')) {
    //         displayTab(a, e !== undefined)
    //     }
    // }

    // window.addEventListener('hashchange', hashChange)
    // hashChange()

    // var joins = document.querySelectorAll('.tab-content-list-join')
    // var unjoins = document.querySelectorAll('.tab-content-list-unjoin')
    // var changeJoin = function (e1, e2) {
    //     e1.classList.remove('active')
    //     e2.classList.add('active')
    // }
    // for (let i = 0; i < joins.length; i++) {
    //     joins[i].addEventListener("click", function (e) {
    //         changeJoin(this, unjoins[i]);
    //     });
    //     unjoins[i].addEventListener("click", function (e) {
    //         changeJoin(this, joins[i]);
    //     });
    // }
// })()

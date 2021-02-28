(function () {
    var displayTab = function (a) {
        var li = a.parentNode
        var div = a.parentNode.parentNode.parentNode
        if (li.classList.contains('active')) {
            return false
        }
        div.querySelector('.tabs .active').classList.remove('active')
        li.classList.add('active')

        div.querySelector(".tab-content.active").classList.remove('active')
        div.querySelector(a.getAttribute('href')).classList.add('active')
    }

    var tabs = document.querySelectorAll('.tabs a')
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', function (e) {
            displayTab(this)
        })
    }

    var hashChange = function (e) {
        var hash = window.location.hash
        var a = document.querySelector('a[href="' + hash + '"]')
        if (a !== null && !a.classList.contains('active')) {
            displayTab(a, e !== undefined)
        }
    }

    window.addEventListener('hashchange', hashChange)
    hashChange()

    var modals = document.querySelectorAll("#password-modal")
    var links = document.querySelectorAll("#tab-content-list-option-link-room")
    var span = document.querySelectorAll(".close")
    
    for (var i = 0; i < links.length; i++) {
        links[i].modal = modals[i];
        links[i].addEventListener('click', function (e) {
            e.currentTarget.modal.style.display = "block";
        })
        span[i].modal = modals[i];
        span[i].addEventListener('click', function (e) {
            e.currentTarget.modal.style.display = "none";
        })
    }
    window.addEventListener('click', function (e) {
        for (var i = 0; i < modals.length; i++) {
            modal = modals[i]
            if (e.target == modal)
                modal.style.display = "none";
        }
    })
})()
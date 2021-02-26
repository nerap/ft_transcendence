let userId = $('.current_user_id').data('userid')
sessionStorage.setItem("chat_userid", userId)

// document.getElementById('messages').scrollTop = 1000;

let menuVisible = false;
var menus = document.querySelectorAll(".user-avatar-received");

const setPosition = (el, { top, left }) => {
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
};

function setContextMenuPostion(event, contextMenu) {

    var mousePosition = {};
    var menuPostion = {};
    var menuDimension = {};

    menuDimension.x = contextMenu.outerWidth;
    menuDimension.y = contextMenu.outerHeight;
    mousePosition.x = event.pageX;
    mousePosition.y = event.pageY;

    if (mousePosition.x + menuDimension.x > $(window).width() + $(window).scrollLeft()) {
        menuPostion.x = mousePosition.x - menuDimension.x;
    } else {
        menuPostion.x = mousePosition.x;
    }

    if (mousePosition.y + menuDimension.y > $(window).height() + $(window).scrollTop()) {
        menuPostion.y = mousePosition.y - menuDimension.y;
    } else {
        menuPostion.y = mousePosition.y;
    }

    return menuPostion;
}

for (var i = 0; i < menus.length; i++) {
    var menu = menus[i];
    var openMenu = function (e) {
        e.preventDefault();
        let pos = setContextMenuPostion(e, this.parentNode.parentNode.nextElementSibling)
        const origin = {
            left: pos.x - 120,
            top: pos.y - 200
        };
        setPosition(this.parentNode.parentNode.nextElementSibling, origin);
        if (!menuVisible) {
            this.parentNode.parentNode.nextElementSibling.style.display = "block";
            menuVisible = !menuVisible;
        }
    }
    menu.addEventListener("contextmenu", openMenu);
}

var closeMenu = function (e) {
    if (menuVisible) {
        for (var i = 0; i < menus.length; i++) {
            menu = menus[i]
            menu.parentNode.parentNode.nextElementSibling.style.display = "none";
        }
        menuVisible = !menuVisible;
    }
}
document.addEventListener('click', closeMenu)

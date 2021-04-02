let userId = $('.current_user_id').data('userid')
sessionStorage.setItem("chat_userid", userId)
let roomId = $('.current_chatroom_id').data('roomid')
sessionStorage.setItem("chat_roomid", roomId)

var element = document.getElementById('messages');
element.scrollTop = element.scrollHeight - element.clientHeight;

let menuVisible = false;
var menus = document.querySelectorAll(".user-avatar-received");

const setPosition = (el, { top, left }) => {
    el.style.left = `${left}px`;
    el.style.top = `${top}px`;
};

function setContextMenuPosition(event, contextMenu) {

    var mousePosition = {};
    var menuPosition = {};
    var menuDimension = {};

    let room = document.querySelector('#room-content');
    menuDimension.x = room.offsetWidth;
    menuDimension.y = room.offsetHeight;
    mousePosition.x = event.pageX;
    mousePosition.y = event.pageY;
    // if (mousePosition.x + menuDimension.x > $(window).width() + $(window).scrollLeft()) {
    // menuPosition.x = mousePosition.x - menuDimension.x;

    // } else {
    // menuPosition.x = mousePosition.x;
    // }

    // if (mousePosition.y + menuDimension.y > $(window).height() + $(window).scrollTop()) {
    // menuPosition.y = mousePosition.y - menuDimension.y;
    // } else {
    // menuPosition.y = mousePosition.y;
    // }
    menuPosition.x = mousePosition.x - ($(window).width() - menuDimension.x) / 2;
    menuPosition.y = mousePosition.y - 140;
    return menuPosition;
}

for (var i = 0; i < menus.length; i++) {
    var menu = menus[i];
    var openMenu = function (e) {
        e.preventDefault();
        let pos = setContextMenuPosition(e, this.parentNode.parentNode.nextElementSibling)
        const origin = {
            left: pos.x,
            top: pos.y
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

/***** new owner menu *****/
var modals = document.querySelectorAll("#password-modal")
var links = document.querySelectorAll("#link-to-new-owner")
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
/**************************/
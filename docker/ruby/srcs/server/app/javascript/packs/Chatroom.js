// document.getElementById('messages').scrollTop = 1000;

let menuVisible = false;
var menus = document.querySelectorAll(".user-message");

const setPosition = (el, { top, left }) => {
    el.nextElementSibling.style.left = `${left}px`;
    el.nextElementSibling.style.top = `${top}px`;
};

for (var i = 0; i < menus.length; i++) {
    var menu = menus[i];
    var openMenu = function (e) {
        e.preventDefault();
        const origin = {
            left: e.pageX + "px",
            top: e.pageY + "px"
        };
        setPosition(this, origin);
        if (!menuVisible) {
            this.nextElementSibling.style.display = "block";
            menuVisible = !menuVisible;
        }
    }
    menu.addEventListener("contextmenu", openMenu);
}

document.addEventListener("click", e => {
    var button = e.which || e.button;
    if (button === 1) {
        if (menuVisible) {
            for (var i = 0; i < menus.length; i++) {
                var menu = menus[i];
                menu.nextElementSibling.style.display = "none";
            }
            menuVisible = !menuVisible;
        }
    }
})

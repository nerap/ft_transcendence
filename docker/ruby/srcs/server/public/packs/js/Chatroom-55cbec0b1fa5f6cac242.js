/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/Chatroom.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/Chatroom.js":
/*!******************************************!*\
  !*** ./app/javascript/packs/Chatroom.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// document.getElementById('messages').scrollTop = 1000;
// var usrmenu = document.querySelectorAll('.user-message')
// for (var i = 0; i < usrmenu.length; i++) {
//     var p = usrmenu[i]
//     var menu = function () {
//         this.nextElementSibling.classList.toggle('visible')
//     }
//     p.addEventListener('click', menu)
// }
var usrMenus = 'user-message';
var menu = document.querySelector('#user-menu');
var menuItems = document.querySelectorAll('.user-message');
var menuState = 0;
var activeClassName = "user-menu.visible";
var menuPosition;
var menuPositionX;
var menuPositionY;
var menuItemInContext;

function init() {
  contextListener();
  clickListener();
  keyupListener();
}

function contextListener() {
  document.addEventListener("contextmenu", function (e) {
    if (clickInsideElement(e, usrMenus)) {
      e.preventDefault();
      toggleMenuOn();
      positionMenu(e);
    } else {
      toggleMenuOff();
    }
  });
}

function clickListener() {
  document.addEventListener("click", function (e) {
    var button = e.which || e.button;

    if (button === 1) {
      toggleMenuOff();
    }
  });
}

function keyupListener() {
  window.onkeyup = function (e) {
    if (e.keyCode === 27) {
      this.toggleMenuOff();
    }
  };
}

function clickInsideElement(e, className) {
  var el = e.srcElement || e.target;

  if (el.classList.contains(className)) {
    return el;
  } else {
    while (el = el.parentNode) {
      if (el.classList && el.classList.contains(className)) {
        return el;
      }
    }
  }

  return false;
}

function toggleMenuOn() {
  if (menuState !== 1) {
    menuState = 1;
    menu.classList.add('visible');
  }
}

function toggleMenuOff() {
  if (menuState !== 0) {
    menuState = 0;
    menu.classList.remove('visible');
  }
}

function getPosition(e) {
  var posx = 0;
  var posy = 0;
  if (!e) var e = window.event;

  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  return {
    x: posx,
    y: posy
  };
}

function positionMenu(e) {
  menuPosition = getPosition(e);
  menuPositionX = menuPosition.x + "px";
  menuPositionY = menuPosition.y + "px";
  menu.style.left = menuPositionX;
  menu.style.top = menuPositionY;
}

init();

/***/ })

/******/ });
//# sourceMappingURL=Chatroom-55cbec0b1fa5f6cac242.js.map
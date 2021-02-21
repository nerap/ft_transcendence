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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/Chatrooms.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/Chatrooms.js":
/*!*******************************************!*\
  !*** ./app/javascript/packs/Chatrooms.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  var displayTab = function displayTab(a, animations) {
    if (animations === undefined) {
      animations = true;
    }

    var li = a.parentNode;
    var div = a.parentNode.parentNode.parentNode;

    if (li.classList.contains('active')) {
      return false;
    }

    div.querySelector('.tabs .active').classList.remove('active');
    li.classList.add('active');
    div.querySelector(".tab-content.active").classList.remove('active');
    div.querySelector(a.getAttribute('href')).classList.add('active');
    /* for fading effect on tabs (not necessary) */
    // var activeTab = div.querySelector(".tab-content.active")
    // var target = div.querySelector(a.getAttribute('href'))
    // if (animations) {
    //     activeTab.classList.add('fade')
    //     activeTab.classList.remove('in')
    //     var transitionend = function () {
    //         this.classList.remove('fade')
    //         this.classList.remove('active')
    //         target.classList.add('active')
    //         target.classList.add('fade')
    //         target.offsetWidth
    //         target.classList.add('in')
    //         activeTab.removeEventListener("transitionend", transitionend)
    //         activeTab.removeEventListener("webkitTransitionEnd", transitionend) // for older versions
    //         activeTab.removeEventListener("oTransitionEnd", transitionend) // for older versions
    //     }
    //     activeTab.addEventListener("transitionend", transitionend)
    //     activeTab.addEventListener("webkitTransitionEnd", transitionend) // for older versions
    //     activeTab.addEventListener("oTransitionEnd", transitionend) // for older versions
    // } else {
    //     target.classList.add('active')
    //     activeTab.classList.remove('active')
    // }
  };

  var tabs = document.querySelectorAll('.tabs a');

  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (e) {
      displayTab(this);
    });
  }

  var hashChange = function hashChange(e) {
    var hash = window.location.hash;
    var a = document.querySelector('a[href="' + hash + '"]');

    if (a !== null && !a.classList.contains('active')) {
      displayTab(a, e !== undefined);
    }
  };

  window.addEventListener('hashchange', hashChange);
  hashChange(); // var modal = document.getElementById("password-modal")
  // var link = document.getElementById("tab-content-option-link")

  var span = document.getElementsByClassName("close")[0]; // link.onclick = function () {
  //     modal.style.display = "block";
  // }

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  };

  var modals = document.querySelectorAll(".modal");
  var links = document.querySelectorAll("#tab-content-option-link"); // var span = document.getElementsByClassName("close")[0]

  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (i) {
      var modals = document.querySelectorAll(".modal");
      modal[i].style.display = "block";
    });
  }
})();

/***/ })

/******/ });
//# sourceMappingURL=Chatrooms-7526407a82cc15ea8ce3.js.map
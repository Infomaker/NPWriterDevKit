/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _index = __webpack_require__(1);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(() => {
	    (0, _index2.default)();
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _DevKitPackage = __webpack_require__(2);
	
	var _DevKitPackage2 = _interopRequireDefault(_DevKitPackage);
	
	var _writer = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = () => {
	    if (_writer.registerPlugin) {
	        (0, _writer.registerPlugin)(_DevKitPackage2.default);
	    } else {
	        console.error("Register method not yet available");
	    }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	__webpack_require__(3);
	
	var _DevKitComponent = __webpack_require__(7);
	
	var _DevKitComponent2 = _interopRequireDefault(_DevKitComponent);
	
	var _writer = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	class Validation extends _writer.Validator {
	
	    constructor(...args) {
	        super(...args);
	    }
	
	    validate() {
	        console.log("Validation");
	    }
	}
	
	exports.default = {
	    name: 'npwriterdevkit',
	    id: 'se.infomaker.npwriterdevkit',
	    configure: function configure(config) {
	        config.addValidator(Validation);
	        config.addComponentToSidebarWithTabId(this.id, 'main', _DevKitComponent2.default);
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _substance = __webpack_require__(8);
	
	var _writer = __webpack_require__(9);
	
	class DevKitComponent extends _substance.Component {
	
	    /**
	     * Method called when component is disposed and removed from DOM
	     */
	    dispose() {}
	    // Perfect place to remove eventlisteners etc
	
	
	    /**
	     * Constructor
	     * @param args
	     */
	    constructor(...args) {
	        super(...args);
	    }
	
	    /**
	     *
	     * @returns {{clickCount: number}}
	     */
	    getInitialState() {
	        return {
	            clickCount: 0
	        };
	    }
	
	    fetchUrl() {
	        const urlToFetch = 'http://api.krisinformation.se/v1/capmessage?format=json';
	
	        _writer.api.router.get('/api/proxy/', { url: urlToFetch }).then(response => this.context.api.router.checkForOKStatus(response)).then(response => response.json()).then(json => {
	            console.log("Response is", json);
	        }).catch(e => {
	            console.error(e);
	        });
	    }
	
	    /**
	     * Render method is called whenever there's a change in state or props
	     * @param $$
	     * @returns {*}
	     */
	    render($$) {
	        const el = $$('div').addClass('devkit');
	
	        el.append($$('h2').append(this.getLabel('Devkit plugin loaded')));
	        el.append($$('p').append(String(this.state.clickCount)));
	
	        let clickCount = this.state.clickCount;
	
	        let button = $$('button').on('click', () => {
	            this.setState({
	                clickCount: clickCount + 1
	            });
	        }).append('Click me');
	
	        el.append(button);
	
	        return el;
	    }
	}
	exports.default = DevKitComponent;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = substance;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = writer;

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map
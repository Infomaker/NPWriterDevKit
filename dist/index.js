/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Preamble = __webpack_require__(1);

	var _Preamble2 = _interopRequireDefault(_Preamble);

	var _index = __webpack_require__(2);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
	    (0, _Preamble2.default)();
	    (0, _index2.default)();
	})();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	exports.default = function () {
	    var _substance = substance;
	    var TextBlock = _substance.TextBlock;
	    var Component = _substance.Component;
	    var TextPropertyComponent = _substance.TextPropertyComponent;
	    var _writer = writer;
	    var api = _writer.api;
	    var registerPlugin = _writer.registerPlugin;

	    var PreambleNode = function (_TextBlock) {
	        _inherits(PreambleNode, _TextBlock);

	        function PreambleNode() {
	            _classCallCheck(this, PreambleNode);

	            return _possibleConstructorReturn(this, (PreambleNode.__proto__ || Object.getPrototypeOf(PreambleNode)).apply(this, arguments));
	        }

	        return PreambleNode;
	    }(TextBlock);

	    PreambleNode.type = 'preamble';
	    PreambleNode.define({
	        "id": { type: 'string' }
	    });

	    var PreambleComponent = function (_Component) {
	        _inherits(PreambleComponent, _Component);

	        function PreambleComponent() {
	            _classCallCheck(this, PreambleComponent);

	            return _possibleConstructorReturn(this, (PreambleComponent.__proto__ || Object.getPrototypeOf(PreambleComponent)).apply(this, arguments));
	        }

	        _createClass(PreambleComponent, [{
	            key: 'render',
	            value: function render($$) {

	                console.log("Config value", api.getConfigValue('se.infomaker.preamble', 'foo'));

	                return $$('div').addClass('sc-preamble').attr('data-id', this.props.node.id).append($$(TextPropertyComponent, {
	                    path: [this.props.node.id, 'content']
	                }));
	            }
	        }]);

	        return PreambleComponent;
	    }(Component);

	    var PreambleConverter = {
	        type: "preamble",
	        tagName: "element",
	        matchElement: function matchElement(el) {
	            return el.is('element[type="preamble"]');
	        },
	        import: function _import(el, node, converter) {
	            node.content = converter.annotatedText(el, [node.id, 'content']);
	        },
	        export: function _export(node, el, converter) {
	            return el.attr('type', 'preamble').append(converter.annotatedText([node.id, 'content']));
	        }
	    };

	    var PreamblePackage = {
	        name: 'preamble',
	        id: 'se.infomaker.preamble',
	        configure: function configure(config) {
	            config.addNode(PreambleNode);
	            config.addComponent(PreambleNode.type, PreambleComponent);
	            config.addConverter('newsml', PreambleConverter);
	            config.addTextType({
	                name: 'preamble',
	                data: { type: 'preamble' }
	            });
	            config.addLabel('preamble.content', {
	                en: 'Preamble',
	                sv: 'Ingress'
	            });
	        }
	    };

	    if (registerPlugin) {
	        registerPlugin(PreamblePackage);
	    } else {
	        console.log("Register method not yet available");
	    }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _TextAnalyzerPackage = __webpack_require__(3);

	var _TextAnalyzerPackage2 = _interopRequireDefault(_TextAnalyzerPackage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _writer = writer;
	var registerPlugin = _writer.registerPlugin;

	exports.default = function () {

	    if (registerPlugin) {
	        registerPlugin(_TextAnalyzerPackage2.default);
	    } else {
	        console.log("Register method not yet available");
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _TextAnalyzerComponent = __webpack_require__(4);

	var _TextAnalyzerComponent2 = _interopRequireDefault(_TextAnalyzerComponent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    name: 'textanalyzer',
	    id: 'se.infomaker.textanalyzer',
	    configure: function configure(config) {

	        config.addSidebarTab({ id: 'textanalyzer', name: 'Textanalys' });
	        // config.addComponentToSidebarTop(this.id, TextanalyzerComponent)
	        config.addComponentToSidebarWithTabId(this.id, 'textanalyzer', _TextAnalyzerComponent2.default);
	    }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _substance = substance;
	var Component = _substance.Component;
	var _writer = writer;
	var api = _writer.api;

	var TextanalyzerComponent = function (_Component) {
	    _inherits(TextanalyzerComponent, _Component);

	    _createClass(TextanalyzerComponent, [{
	        key: 'dispose',
	        value: function dispose() {
	            api.events.off('textanalyzer', 'document:changed');
	        }
	    }]);

	    function TextanalyzerComponent() {
	        var _ref;

	        _classCallCheck(this, TextanalyzerComponent);

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        var _this = _possibleConstructorReturn(this, (_ref = TextanalyzerComponent.__proto__ || Object.getPrototypeOf(TextanalyzerComponent)).call.apply(_ref, [this].concat(args)));

	        api.events.on('textanalyzer', 'document:changed', function () {
	            _this.calculateText();
	        });
	        return _this;
	    }

	    _createClass(TextanalyzerComponent, [{
	        key: 'calculateText',
	        value: function calculateText() {
	            var count = this.getCount();
	            this.setState({
	                textLength: count.textLength,
	                words: count.words
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render($$) {
	            console.log("Gello");
	            var el = $$('div').addClass('sc-information-panel plugin').append($$('h2').append('Text'));

	            var numberContainer = $$('div').addClass('number__container clearfix');

	            var textlengthEl = $$('div').addClass('count-info').append($$('span').append(this.state.textLength.toString())).append($$('p').append('Tecken')).attr('title', "Tecken");

	            var wordsEl = $$('div').addClass('count-info').append($$('span').append(this.state.words.toString())).append($$('p').append('Ord')).attr('title', "Ord");

	            numberContainer.append([textlengthEl, wordsEl]);
	            el.append(numberContainer);

	            return el;
	        }
	    }, {
	        key: 'getInitialState',
	        value: function getInitialState() {
	            var count = this.getCount();
	            return {
	                textLength: count.textLength,
	                words: count.words
	            };
	        }
	    }, {
	        key: 'getCount',
	        value: function getCount() {
	            var nodes = api.document.getDocumentNodes();
	            var textContent = "";
	            nodes.forEach(function (node) {
	                if (node.content) {
	                    textContent += node.content.trim();
	                }
	            });
	            var words = textContent.split(/\s+/);
	            var textLength = textContent.length;

	            return {
	                words: words.length,
	                textLength: textLength
	            };
	        }
	    }]);

	    return TextanalyzerComponent;
	}(Component);

	exports.default = TextanalyzerComponent;

/***/ }
/******/ ]);
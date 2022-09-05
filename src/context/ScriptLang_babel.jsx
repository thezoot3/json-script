"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ScriptLang = void 0;

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ScriptLang = {
    createContext: function createContext(defaultLang) {
        this.context = /*#__PURE__*/(0, _react.createContext)(defaultLang);
        return this.context;
    },
    Provider: function Provider(_ref) {
        var value = _ref.value,
            children = _ref.children;
        return /*#__PURE__*/React.createElement(this.context.Provider, {
            value: value
        }, children);
    }
};
exports.ScriptLang = ScriptLang;
ScriptLang.Provider.propTypes = {
    value: _propTypes["default"].string.isRequired
};

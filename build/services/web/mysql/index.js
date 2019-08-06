"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "procedures", {
  enumerable: true,
  get: function get() {
    return _procedures["default"];
  }
});
Object.defineProperty(exports, "views", {
  enumerable: true,
  get: function get() {
    return _views["default"];
  }
});
exports["default"] = void 0;

var _connection = _interopRequireDefault(require("./connection"));

var _procedures = _interopRequireDefault(require("./procedures"));

var _views = _interopRequireDefault(require("./views"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _connection["default"];
exports["default"] = _default;
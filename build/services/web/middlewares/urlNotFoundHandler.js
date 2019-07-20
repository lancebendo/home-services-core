"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _boom = _interopRequireDefault(require("boom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// for handling 404 api endpoint not found
var urlNotFoundHandler = function urlNotFoundHandler() {
  return function (req, res, next) {
    next(_boom["default"].notFound('API endpoint not found.'));
  };
};

var _default = urlNotFoundHandler;
exports["default"] = _default;
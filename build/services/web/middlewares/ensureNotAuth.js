"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _boom = _interopRequireDefault(require("boom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ensureNotAuth = function ensureNotAuth(req, res, next) {
  if (!req.user) next();else next(_boom["default"].unauthorized('You need to log-out first.'));
};

var _default = ensureNotAuth;
exports["default"] = _default;
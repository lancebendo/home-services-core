"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _boom = _interopRequireDefault(require("boom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable brace-style */

/* eslint-disable max-len */
const ensureAuth = (req, res, next) => {
  if (req.user && req.user.isBlocked) next(_boom.default.unauthorized('Your account is blocked. Please contact us regarding to this issue.'));else if (req.user) next();else next(_boom.default.unauthorized('Login required.'));
};

var _default = ensureAuth;
exports.default = _default;
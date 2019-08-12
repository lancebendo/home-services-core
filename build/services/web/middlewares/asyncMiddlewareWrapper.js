"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _boom = _interopRequireDefault(require("boom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// this middleware is a wrapper for async middlewares to handle errors
const asyncMiddlewareWrapper = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    if (!err.isBoom) next(_boom.default.badImplementation(err));else next(err);
  });
};

var _default = asyncMiddlewareWrapper;
exports.default = _default;
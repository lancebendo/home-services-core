"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bodyValidation = (schema, body = null) => (req, res, next) => {
  _joi.default.validate(body == null ? req.body : body, schema, err => {
    if (err) next(_boom.default.badRequest(`Invalid input! ${err.message}`));else next();
  });
};

var _default = bodyValidation;
exports.default = _default;
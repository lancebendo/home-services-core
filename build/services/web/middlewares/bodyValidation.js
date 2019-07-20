"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var bodyValidation = function bodyValidation(schema) {
  var body = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  return function (req, res, next) {
    _joi["default"].validate(body == null ? req.body : body, schema, function (err) {
      if (err) next(_boom["default"].badRequest("Invalid input! ".concat(err.message)));else next();
    });
  };
};

var _default = bodyValidation;
exports["default"] = _default;
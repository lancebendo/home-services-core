"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _fs = _interopRequireDefault(require("fs"));

var _defaults = _interopRequireDefault(require("./defaults"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (_fs["default"].existsSync('.env')) {
  _dotenv["default"].config();
} // do not overwrite if the config key is already existing in process.env


Object.keys(_defaults["default"]).forEach(function (key) {
  process.env[key] = key in process.env ? process.env[key] : _defaults["default"][key];
});
var _default = process.env;
exports["default"] = _default;
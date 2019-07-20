"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (_fs["default"].existsSync('.env')) {
  _dotenv["default"].config();
}

var defaults = {
  MYSQL_HOST: 'localhost',
  MYSQL_PASSWORD: 'tmackulet'
}; // do not overwrite if the config key is already existing in process.env

Object.keys(defaults).forEach(function (key) {
  process.env[key] = key in process.env ? process.env[key] : defaults[key];
});
var _default = process.env;
exports["default"] = _default;
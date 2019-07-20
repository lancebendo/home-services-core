"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import connectionString from 'connection-string';
// connectionString
var connection = _mysql["default"].createConnection({
  host: 'localhost',
  user: 'me',
  password: 'secret',
  database: 'my_db'
});

var _default = connection;
exports["default"] = _default;
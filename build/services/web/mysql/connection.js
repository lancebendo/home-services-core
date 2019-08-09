"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getConnection = function getConnection() {
  return _mysql["default"].createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USERNAME || 'home_services_app',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'home_services'
  });
};

var _default = getConnection;
exports["default"] = _default;
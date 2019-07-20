"use strict";

var _config = _interopRequireDefault(require("./config"));

var _mysql = _interopRequireDefault(require("./services/web/mysql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const obj = new ConnectionString(process.env.MYSQL_URL, { user: 'root' });
// console.log(obj);
console.log(_config["default"].MYSQL);

_mysql["default"].connect(function (err) {
  if (err) {
    console.error("error connecting: ".concat(err.stack));
    return;
  }

  console.log("connected as id ".concat(_mysql["default"].threadId));
});

_mysql["default"].query('SELECT * FROM user', function (error, results) {
  if (error) throw error; // connected!

  console.log(results[0].firstname);
});

_mysql["default"].end(function (err) {
  if (err) throw err;
  console.log('connection ended');
});
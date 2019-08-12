"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _boom = _interopRequireDefault(require("boom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*

  accept a logic function to be executed in the middle.

  accept an error handler function in case of error.

  accept configuration if isreadonly, isautoend, etc.

*/
const dbConnect = (logic, errHandler, {
  isReadOnlyConnection = true,
  isAutoEnd = true,
  isTransaction = false
}) => {
  // create connection via env
  const connection = _mysql.default.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: isReadOnlyConnection ? process.env.MYSQL_READONLY || 'readonly_hs_user' : process.env.MYSQL_WRITER || 'writer_hs_user',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'home_services'
  }); // bind error handler


  connection.on('error', err => {
    const handleError = () => errHandler(_boom.default.badRequest('Error on database request', err));

    if (isTransaction) connection.rollback(handleError);else handleError();
  });
  connection.connect(err => {
    if (err) {
      const handleError = () => errHandler(_boom.default.serverUnavailable('Unable to connect to the Database.'));

      if (isTransaction) connection.rollback(handleError);else handleError();
    }
  });
  logic(connection, errHandler);

  if (isAutoEnd) {
    connection.end(err => {
      if (err) {
        console.log(err);
        console.log('Unable to close the connection to the database');
      }
    });
  }

  return connection;
};

var _default = dbConnect;
exports.default = _default;
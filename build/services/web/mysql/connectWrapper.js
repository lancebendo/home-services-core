"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _bluebird = require("bluebird");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*

  accept a logic function to be executed in the middle.

  accept an error handler function in case of error.

  accept configuration if isreadonly, isautoend, etc.

*/
// return queryWrapper(insertQuery(sdfwwfw), connection);
const connectWrapper = ({
  isReadOnlyConnection = true,
  isTransaction = false,
  multipleStatements = false
}) => new _bluebird.Promise((resolve, reject) => {
  // create connection via env
  const connection = _mysql.default.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: isReadOnlyConnection ? process.env.MYSQL_READONLY || 'readonly_hs_user' : process.env.MYSQL_WRITER || 'writer_hs_user',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'home_services',
    multipleStatements
  }); // bind error handler


  connection.on('error', err => {
    if (isTransaction) connection.rollback();
    reject({
      connection,
      error: err
    });
  });
  connection.connect(err => {
    if (err) {
      if (isTransaction) connection.rollback();
      reject({
        connection,
        error: err
      });
    } else resolve({
      connection
    });
  });
}); // const connectWrapper = (
//   errHandler,
//   query,
//   {
//     isReadOnlyConnection = true,
//     isAutoEnd = true,
//     isTransaction = false,
//     multipleStatements = false,
//   } = {},
// ) => {
//   // create connection via env
//   const connection = mysql.createConnection({
//     host: process.env.MYSQL_HOST || 'localhost',
//     user: isReadOnlyConnection ? process.env.MYSQL_READONLY ||
//    'readonly_hs_user' : process.env.MYSQL_WRITER || 'writer_hs_user',
//     password: process.env.MYSQL_PASSWORD || 'password',
//     database: process.env.MYSQL_DATABASE || 'home_services',
//     multipleStatements,
//   });
//   // error handlers
//   const connectionError = err => errHandler
//  (boom.badGateway('Cannot cannot to the Database', err));
//   const queryError = err => errHandler(boom.internal('Database Query Error', err));
//   const defaultError = err => errHandler(boom.badRequest('Error on database request', err));
//   // bind error handler
//   connection.on('error', (err) => {
//     if (isTransaction) connection.rollback();
//     defaultError(err);
//   });
//   connection.connect((err) => {
//     if (err) {
//       if (isTransaction) connection.rollback();
//       connectionError(err);
//     }
//   });
//   query(
//     connection,
//     queryError,
//     { isAutoEnd, isTransaction },
//     (connectionToEnd) => {
//       if (isAutoEnd) {
//         if (isTransaction) {
//           connectionToEnd.commit(null, (err) => {
//             if (err) connection.rollback();
//             connectionToEnd.end((_err) => {
//               if (_err) {
//                 console.log(_err);
//                 console.log('Unable to close the connection to the database');
//               }
//             });
//           });
//         } else {
//           connectionToEnd.end((err) => {
//             if (err) {
//               console.log(err);
//               console.log('Unable to close the connection to the database');
//             }
//           });
//         }
//       }
//     },
//   );
//   return connection;
// };


var _default = connectWrapper;
exports.default = _default;
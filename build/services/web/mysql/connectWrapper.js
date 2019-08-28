"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _bluebird = require("bluebird");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */

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
}) => {
  // create connection via env
  const connection = _mysql.default.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: isReadOnlyConnection ? process.env.MYSQL_READONLY || 'readonly_hs_user' : process.env.MYSQL_WRITER || 'writer_hs_user',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'home_services',
    multipleStatements
  });

  return new _bluebird.Promise((resolve, reject) => {
    // bind error handler
    connection.on('error', error => {
      if (isTransaction) {
        console.log('Rolling back');
        connection.rollback(_error => {
          if (_error) reject(_error);
          reject(error);
        });
      }

      reject(error);
    });

    const errorHandler = () => {
      if (isTransaction) {
        console.log('Rolling back');
        connection.rollback(__error => {
          if (__error) reject(__error);else connection.end();
        });
      } else connection.end();
    };

    const resultHandler = () => {
      if (isTransaction) {
        console.log('Committing');
        connection.commit(_error => {
          if (_error) {
            console.log('Rolling back');
            connection.rollback(__error => {
              if (__error) reject(__error);else connection.end();
            });
            reject(_error);
          } else connection.end();
        });
      } else connection.end();
    };

    connection.connect(error => {
      if (error) reject(error);else if (isTransaction) {
        connection.beginTransaction(_error => {
          if (_error) reject(_error);
          resolve({
            connection,
            resultHandler,
            errorHandler
          });
        });
      } else resolve({
        connection,
        resultHandler,
        errorHandler
      });
    });
  });
}; // const connectWrapper = (
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
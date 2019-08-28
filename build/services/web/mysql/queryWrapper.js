"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bluebird = require("bluebird");

const queryWrapper = ({
  queryString,
  params = [],
  isFinalQuery = false
}) => ({
  connection,
  resultHandler,
  errorHandler
}) => new _bluebird.Promise((resolve, reject) => {
  connection.query(queryString, params, (error, result) => {
    if (error) {
      errorHandler();
      reject(error);
    } else {
      if (isFinalQuery) resultHandler();
      resolve({
        connection,
        result,
        resultHandler,
        errorHandler
      });
    }
  });
}); // const queryWrapper = (
//   queryString,
//   callback,
// ) => (
//   connection,
//   errHandler,
//   { isAutoEnd, isTransaction },
//   endConnection,
// ) => {
//   connection.query(queryString, (err, results) => {
//     if (err) {
//       if (isTransaction) connection.rollback();
//       errHandler(err);
//     } else {
//       const nextQuery = callback(results);
//       if (nextQuery) nextQuery(connection, errHandler,
//      { isTransaction, isAutoEnd }, endConnection);
//       else endConnection(connection);
//     }
//   });
// };


var _default = queryWrapper;
exports.default = _default;
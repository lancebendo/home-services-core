"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const queryWrapper = (queryString, callback) => (connection, errHandler, {
  isAutoEnd,
  isTransaction
}, endConnection) => {
  connection.query(queryString, (err, results) => {
    if (err) {
      if (isTransaction) connection.rollback();
      errHandler(err);
    } else {
      const nextQuery = callback(results);
      if (nextQuery) nextQuery(connection, errHandler, {
        isTransaction,
        isAutoEnd
      }, endConnection);else endConnection(connection);
    }
  });
};

var _default = queryWrapper;
exports.default = _default;
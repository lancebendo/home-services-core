"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bluebird = require("bluebird");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const queryWrapper = ({
  queryString,
  params = [],
  isFinalQuery = false,
  resultHandler = result => result
}) => ({
  connection,
  result: lastResult = {},
  successHandler,
  errorHandler
}) => new _bluebird.Promise((resolve, reject) => {
  connection.query(queryString, params, (error, queryResult) => {
    if (error) {
      errorHandler();
      reject(error);
    } else {
      if (isFinalQuery) successHandler();
      const finalResult = resultHandler(queryResult);
      resolve({
        connection,
        result: _objectSpread({}, lastResult, {}, finalResult),
        successHandler,
        errorHandler
      });
    }
  });
});

var _default = queryWrapper;
exports.default = _default;
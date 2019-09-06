"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _bluebird = require("bluebird");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const connectWrapper = ({
  connectionConfig = _constants.defaultConnectionConfig,
  isReadOnlyConnection = true,
  isTransaction = false,
  multipleStatements = false
}) => {
  // create connection via env
  const connection = _mysql.default.createConnection(_objectSpread({}, connectionConfig, {
    user: isReadOnlyConnection ? process.env.MYSQL_READONLY || connectionConfig.readOnlyUser : process.env.MYSQL_WRITER || connectionConfig.writerUser,
    multipleStatements
  }));

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

    const successHandler = () => {
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
            successHandler,
            errorHandler
          });
        });
      } else resolve({
        connection,
        successHandler,
        errorHandler
      });
    });
  });
};

var _default = connectWrapper;
exports.default = _default;
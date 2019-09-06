"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.procedureApi = exports.getApi = void 0;

var _connectWrapper = _interopRequireDefault(require("./connectWrapper"));

var _queryWrapper = _interopRequireDefault(require("./queryWrapper"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getApi = ({
  connectionConfig = _constants.defaultConnectionConfig,
  query,
  resultHandler = result => result,
  isMultipleStatement = true
}) => (req, res, next) => {
  let finalQuery = '';
  if (typeof query !== 'string') finalQuery = query(_objectSpread({}, req.params, {}, req.query));else finalQuery = query;
  (0, _connectWrapper.default)({
    connectionConfig,
    isReadOnlyConnection: true,
    multipleStatements: isMultipleStatement
  }).then((0, _queryWrapper.default)({
    queryString: finalQuery,
    isFinalQuery: true,
    resultHandler
  })).then(({
    result
  }) => res.status(200).json({
    status: 'success',
    data: result || null
  })).catch(next);
};

exports.getApi = getApi;

const procedureApi = ({
  connectionConfig = _constants.defaultConnectionConfig,
  query,
  paramsHandler = params => [...params],
  resultHandler = result => result,
  responseCode = 200
}) => (req, res, next) => {
  let finalQuery = '';
  if (typeof query !== 'string') finalQuery = query(_objectSpread({}, req.params, {}, req.query));else finalQuery = query;
  (0, _connectWrapper.default)({
    connectionConfig,
    isReadOnlyConnection: false,
    isTransaction: true,
    multipleStatements: true
  }).then((0, _queryWrapper.default)({
    queryString: finalQuery,
    params: paramsHandler(_objectSpread({}, req.params, {}, req.body)),
    resultHandler,
    isFinalQuery: true
  })).then(({
    result
  }) => res.status(responseCode).json({
    status: 'success',
    data: result
  })).catch(next);
};

exports.procedureApi = procedureApi;
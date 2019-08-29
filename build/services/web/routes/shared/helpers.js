"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteApi = exports.updateApi = exports.createApi = exports.getByIdApi = exports.getByMultipleApi = void 0;

var _mysql = require("../../mysql");

var _helpers = require("../../helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getByMultipleApi = table => (req, res, next) => {
  const queryString = `SELECT * FROM ${table} ${(0, _helpers.getWhere)(_objectSpread({
    is_active: 1
  }, req.query))} ORDER BY CREATED_DATE DESC`;
  (0, _mysql.connectWrapper)({
    isReadOnlyConnection: true
  }).then((0, _mysql.queryWrapper)({
    queryString,
    isFinalQuery: true
  })).then(({
    result
  }) => res.status(200).json({
    status: 'success',
    data: result
  })).catch(next);
};

exports.getByMultipleApi = getByMultipleApi;

const getByIdApi = table => (req, res, next) => {
  const queryString = `SELECT * FROM ${table} ${(0, _helpers.getWhere)({
    is_active: 1,
    id: req.params.id
  })} LIMIT 1`;
  (0, _mysql.connectWrapper)({
    isReadOnlyConnection: true
  }).then((0, _mysql.queryWrapper)({
    queryString,
    isFinalQuery: true
  })).then(({
    result
  }) => res.status(200).json({
    status: 'success',
    data: result || null
  })).catch(next);
};

exports.getByIdApi = getByIdApi;

const createApi = (table, createProcedure, getCreateFields) => (req, res, next) => {
  (0, _mysql.connectWrapper)({
    isReadOnlyConnection: false,
    isTransaction: true
  }).then((0, _mysql.queryWrapper)({
    queryString: createProcedure,
    params: getCreateFields(req.body)
  })).then((0, _mysql.queryWrapper)({
    queryString: `SELECT * FROM ${table} WHERE id = LAST_INSERT_ID()`,
    isFinalQuery: true
  })).then(({
    result
  }) => res.status(201).json({
    status: 'success',
    data: result
  })).catch(next);
};

exports.createApi = createApi;

const updateApi = (table, updateProcedure, getUpdateFields) => (req, res, next) => {
  const {
    id
  } = req.params;
  (0, _mysql.connectWrapper)({
    isReadOnlyConnection: false,
    isTransaction: true
  }).then((0, _mysql.queryWrapper)({
    queryString: updateProcedure,
    params: getUpdateFields(_objectSpread({
      id
    }, req.body))
  })).then((0, _mysql.queryWrapper)({
    queryString: `SELECT * FROM ${table} ${(0, _helpers.getWhere)({
      id
    })}`,
    isFinalQuery: true
  })).then(({
    result
  }) => res.status(201).json({
    status: 'success',
    data: result
  })).catch(next);
};

exports.updateApi = updateApi;

const deleteApi = table => (req, res, next) => {
  const {
    id
  } = req.params;
  (0, _mysql.connectWrapper)({
    isReadOnlyConnection: false,
    isTransaction: true
  }).then((0, _mysql.queryWrapper)({
    queryString: 'CALL isActiveUpdate(?, ?, ?)',
    params: [table, id, 0],
    isFinalQuery: true
  })).then(() => res.status(201).json({
    status: 'success',
    data: {
      deletedId: id
    }
  })).catch(next);
};

exports.deleteApi = deleteApi;
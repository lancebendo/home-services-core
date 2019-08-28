"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _mysql = require("../../mysql");

var _helpers = require("../../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const createCrudApi = ({
  table,
  createProcedure,
  getCreateFields,
  updateProcedure,
  getUpdateFields,
  getMultipleMiddlewares = [],
  getByIdMiddlewares = [],
  createMiddlewares = [],
  updateMiddlewares = [],
  deleteMiddlewares = []
}) => {
  const router = _express.default.Router(); // GET /service?{filter} (get active services by filter. PUBLIC)


  router.get('/', ...getMultipleMiddlewares, (req, res, next) => {
    const queryString = `SELECT * FROM ${table} ${(0, _helpers.getWhere)(_objectSpread({
      is_active: 1
    }, req.query))} ORDER BY CREATED_DATE DESC`;
    (0, _mysql.connectWrapper)({
      isReadOnlyConnection: true
    }).then(({
      connection
    }) => (0, _mysql.queryWrapper)(connection, queryString)).then(({
      connection,
      result
    }) => {
      connection.end();
      res.status(200).json({
        status: 'success',
        data: result[0]
      });
    }).catch(({
      error
    }) => next(error));
  }); // GET /service/{id} (get service by id. PUBLIC)

  router.get('/:id(\\d+)', ...getByIdMiddlewares, (req, res, next) => {
    const queryString = `SELECT * FROM ${table} ${(0, _helpers.getWhere)({
      is_active: 1,
      id: req.params.id
    })} LIMIT 1`;
    (0, _mysql.connectWrapper)({
      isReadOnlyConnection: true
    }).then(({
      connection
    }) => (0, _mysql.queryWrapper)(connection, queryString)).then(({
      connection,
      result
    }) => {
      connection.end();
      res.status(200).json({
        status: 'success',
        data: result[0]
      });
    }).catch(({
      error
    }) => next(error));
  });

  if (createProcedure) {
    router.post('/', ...createMiddlewares, (req, res, next) => {
      // const { name, description, is_subservice: isSubservice } = req.body;
      (0, _mysql.connectWrapper)({
        isReadOnlyConnection: false,
        isTransaction: true
      }).then(({
        connection
      }) => (0, _mysql.queryWrapper)(connection, // `CALL ${createProcedure}(@new_id, ?, ?, ?)`,
      `CALL ${createProcedure}`, getCreateFields(req.body))).then(({
        connection
      }) => (0, _mysql.queryWrapper)(connection, `SELECT * FROM ${table} WHERE id = LAST_INSERT_ID()`)).then(({
        connection,
        result
      }) => {
        connection.end();
        res.status(201).json({
          status: 'success',
          data: result[0]
        });
      }).catch(({
        connection,
        error
      }) => {
        connection.rollback();
        next(error);
      });
    });
  }

  if (updateProcedure) {
    router.put('/:id(\\d+)', ...updateMiddlewares, (req, res, next) => {
      // const { name, description } = req.body;
      const {
        id
      } = req.params;
      (0, _mysql.connectWrapper)({
        isReadOnlyConnection: false,
        isTransaction: true
      }).then(({
        connection
      }) => (0, _mysql.queryWrapper)(connection, // `CALL ${updateProcedure}(?, ?, ?)`,
      `CALL ${updateProcedure}`, getUpdateFields(_objectSpread({
        id
      }, req.body)))).then(({
        connection
      }) => (0, _mysql.queryWrapper)(connection, `SELECT * FROM ${table} ${(0, _helpers.getWhere)({
        id
      })}`)).then(({
        connection,
        result
      }) => {
        connection.end();
        res.status(201).json({
          status: 'success',
          data: result[0]
        });
      }).catch(({
        connection,
        error
      }) => {
        connection.rollback();
        next(error);
      });
    });
  }

  router.delete('/:id(\\d+)', ...deleteMiddlewares, (req, res, next) => {
    const {
      id
    } = req.params;
    (0, _mysql.connectWrapper)({
      isReadOnlyConnection: false,
      isTransaction: true
    }).then(({
      connection
    }) => (0, _mysql.queryWrapper)(connection, 'CALL isActiveUpdate(?, ?, ?)', [table, id, 0])).then(({
      connection
    }) => {
      connection.end();
      res.status(201).json({
        status: 'success',
        data: {
          deletedId: id
        }
      });
    }).catch(({
      connection,
      error
    }) => {
      connection.rollback();
      next(error);
    });
  });
  return router;
};

var _default = createCrudApi;
exports.default = _default;
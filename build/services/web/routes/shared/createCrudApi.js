"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressMysqlHelpers = require("express-mysql-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createCrudApi = ({
  table,
  getMultipleQueryHandler,
  getMultipleResultHandler = result => result,
  // isMultipleStatementMultipleQuery = false,
  getByIdQueryHandler,
  getByIdResultHandler = result => result,
  // isMultipleStatementByIdQuery = false,
  createProcedure,
  updateProcedure,
  getCreateFields = fields => Object.keys(fields).map(field => fields[field]),
  getUpdateFields = fields => Object.keys(fields).map(field => fields[field]),
  getMultipleMiddlewares = [],
  getByIdMiddlewares = [],
  createMiddlewares = [],
  updateMiddlewares = [],
  deleteMiddlewares = []
}) => {
  const router = _express.default.Router();

  router.get('/', ...getMultipleMiddlewares, (0, _expressMysqlHelpers.getApi)(getMultipleQueryHandler, true, getMultipleResultHandler));
  router.get('/:id(\\d+)', ...getByIdMiddlewares, (0, _expressMysqlHelpers.getApi)(getByIdQueryHandler, true, getByIdResultHandler));

  if (createProcedure) {
    router.post('/', ...createMiddlewares, (0, _expressMysqlHelpers.procedureApi)(table, createProcedure, getCreateFields));
  }

  if (updateProcedure) {
    router.put('/:id(\\d+)', ...updateMiddlewares, (0, _expressMysqlHelpers.procedureApi)(table, updateProcedure, getUpdateFields));
  }

  router.delete('/:id(\\d+)', ...deleteMiddlewares, (0, _expressMysqlHelpers.procedureApi)(table));
  return router;
};

var _default = createCrudApi;
exports.default = _default;
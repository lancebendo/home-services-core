"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createCrudApi = ({
  table,
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

  router.get('/', ...getMultipleMiddlewares, (0, _helpers.getByMultipleApi)(table));
  router.get('/:id(\\d+)', ...getByIdMiddlewares, (0, _helpers.getByIdApi)(table));

  if (createProcedure) {
    router.post('/', ...createMiddlewares, (0, _helpers.createApi)(table, createProcedure, getCreateFields));
  }

  if (updateProcedure) {
    router.put('/:id(\\d+)', ...updateMiddlewares, (0, _helpers.updateApi)(table, updateProcedure, getUpdateFields));
  }

  router.delete('/:id(\\d+)', ...deleteMiddlewares, (0, _helpers.deleteApi)(table));
  return router;
};

var _default = createCrudApi;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _constants = require("./constants");

var _expressApi = require("./expressApi");

var _queryHelpers = require("./queryHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getDomainRouter = ({
  connectionConfig = _constants.defaultConnectionConfig,
  viewTable = '',
  getMultipleResultHandler = result => result,
  createProcedure = {
    query: '',
    paramsHandler: params => [...params]
  },
  updateProcedure = {
    query: '',
    paramsHandler: params => [...params]
  },
  deleteProcedure = {
    query: '',
    paramsHandler: params => [...params]
  },
  getMultipleMiddlewares = [],
  getByIdMiddlewares = [],
  createMiddlewares = [],
  updateMiddlewares = [],
  deleteMiddlewares = []
}) => {
  const router = _express.default.Router(); // yung order by, di na sa query, sa resultHandler na lang.


  router.get('/', ...getMultipleMiddlewares, (req, res, next) => {
    req.query.is_active = 1;
    next();
  }, (0, _expressApi.getApi)({
    connectionConfig,
    query: query => `SELECT * FROM ${viewTable} ${(0, _queryHelpers.getWhere)(query)}`,
    resultHandler: getMultipleResultHandler,
    isMultipleStatement: false
  }));
  router.get('/:id(\\d+)', ...getByIdMiddlewares, (req, res, next) => {
    req.query.is_active = 1;
    next();
  }, (0, _expressApi.getApi)({
    connectionConfig,
    query: ({
      id
    }) => `SELECT * FROM ${viewTable} ${(0, _queryHelpers.getWhere)({
      id
    })} LIMIT 1`,
    resultHandler: result => result[0],
    isMultipleStatement: false
  }));

  if (createProcedure) {
    router.post('/', ...createMiddlewares, (0, _expressApi.procedureApi)({
      connectionConfig,
      query: `${createProcedure.query}${createProcedure.query.charAt(createProcedure.query.length - 1) === ';' ? '' : ';'} 
      SELECT * FROM ${viewTable} where id = LAST_INSERT_ID();`,
      // dagdag dito yung select
      paramsHandler: createProcedure.paramsHandler,
      resultHandler: result => result[1][0],
      responseCode: 201
    }));
  }

  if (updateProcedure) {
    router.put('/:id(\\d+)', ...updateMiddlewares, (0, _expressApi.procedureApi)({
      connectionConfig,
      query: ({
        id
      }) => `${updateProcedure.query}${updateProcedure.query.charAt(updateProcedure.query.length - 1) === ';' ? '' : ';'} 
      SELECT * FROM ${viewTable} where id = ${id}`,
      paramsHandler: updateProcedure.paramsHandler,
      resultHandler: result => result[1][0],
      responseCode: 200
    }));
  }

  if (deleteProcedure) {
    router.delete('/:id(\\d+)', ...deleteMiddlewares, (0, _expressApi.procedureApi)({
      connectionConfig,
      query: deleteProcedure.query,
      paramsHandler: deleteProcedure.paramsHandler,
      resultHandler: () => null
    }));
  }

  return router;
};

var _default = getDomainRouter;
exports.default = _default;
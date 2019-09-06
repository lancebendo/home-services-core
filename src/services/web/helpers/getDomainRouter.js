import express from 'express';

import { defaultConnectionConfig } from './constants';
import { getApi, procedureApi } from './expressApi';
import { getWhere } from './queryHelpers';

const getDomainRouter = ({
  connectionConfig = defaultConnectionConfig,
  viewTable = '',
  getMultipleResultHandler = (result) => result,
  createProcedure = { query: '', paramsHandler: (params) => [...params] },
  updateProcedure = { query: '', paramsHandler: (params) => [...params] },
  deleteProcedure = { query: '', paramsHandler: (params) => [...params] },
  getMultipleMiddlewares = [],
  getByIdMiddlewares = [],
  createMiddlewares = [],
  updateMiddlewares = [],
  deleteMiddlewares = [],
}) => {
  const router = express.Router();

  // yung order by, di na sa query, sa resultHandler na lang.
  router.get(
    '/',
    ...getMultipleMiddlewares,
    (req, res, next) => {
      req.query.is_active = 1;
      next();
    },
    getApi({
      connectionConfig,
      query: (query) => `SELECT * FROM ${viewTable} ${getWhere(query)}`,
      resultHandler: getMultipleResultHandler,
      isMultipleStatement: false,
    }),
  );

  router.get(
    '/:id(\\d+)',
    ...getByIdMiddlewares,
    (req, res, next) => {
      req.query.is_active = 1;
      next();
    },
    getApi({
      connectionConfig,
      query: ({ id }) => `SELECT * FROM ${viewTable} ${getWhere({ id })} LIMIT 1`,
      resultHandler: (result) => result[0],
      isMultipleStatement: false,
    }),
  );

  if (createProcedure) {
    router.post('/', ...createMiddlewares, procedureApi({
      connectionConfig,
      query: `${createProcedure.query}${createProcedure.query.charAt(createProcedure.query.length - 1) === ';' ? '' : ';'} 
      SELECT * FROM ${viewTable} where id = LAST_INSERT_ID();`, // dagdag dito yung select
      paramsHandler: createProcedure.paramsHandler,
      resultHandler: (result) => result[1][0],
      responseCode: 201,
    }));
  }

  if (updateProcedure) {
    router.put('/:id(\\d+)', ...updateMiddlewares, procedureApi({
      connectionConfig,
      query: ({ id }) => `${updateProcedure.query}${updateProcedure.query.charAt(updateProcedure.query.length - 1) === ';' ? '' : ';'} 
      SELECT * FROM ${viewTable} where id = ${id}`,
      paramsHandler: updateProcedure.paramsHandler,
      resultHandler: (result) => result[1][0],
      responseCode: 200,
    }));
  }

  if (deleteProcedure) {
    router.delete('/:id(\\d+)', ...deleteMiddlewares, procedureApi({
      connectionConfig,
      query: deleteProcedure.query,
      paramsHandler: deleteProcedure.paramsHandler,
      resultHandler: () => null,
    }));
  }

  return router;
};


export default getDomainRouter;

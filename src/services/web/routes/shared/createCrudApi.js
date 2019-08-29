import express from 'express';

import {
  getRecords, createApi, updateApi, deleteApi,
} from './helpers';

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
  deleteMiddlewares = [],
}) => {
  const router = express.Router();

  router.get('/', ...getMultipleMiddlewares, getRecords(getMultipleQueryHandler, true, getMultipleResultHandler));

  router.get('/:id(\\d+)', ...getByIdMiddlewares, getRecords(getByIdQueryHandler, true, getByIdResultHandler));

  if (createProcedure) {
    router.post('/', ...createMiddlewares, createApi(table, createProcedure, getCreateFields));
  }

  if (updateProcedure) {
    router.put('/:id(\\d+)', ...updateMiddlewares, updateApi(table, updateProcedure, getUpdateFields));
  }

  router.delete('/:id(\\d+)', ...deleteMiddlewares, deleteApi(table));

  return router;
};


export default createCrudApi;

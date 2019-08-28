import express from 'express';

import {
  getByMultipleApi, getByIdApi, createApi, updateApi, deleteApi,
} from './helpers';

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
  deleteMiddlewares = [],
}) => {
  const router = express.Router();

  router.get('/', ...getMultipleMiddlewares, getByMultipleApi(table));

  router.get('/:id(\\d+)', ...getByIdMiddlewares, getByIdApi(table));

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

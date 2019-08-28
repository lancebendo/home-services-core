import { connectWrapper, queryWrapper } from '../../mysql';
import { getWhere } from '../../helpers';

export const getByMultipleApi = table => (req, res, next) => {
  const queryString = `SELECT * FROM ${table} ${getWhere({ is_active: 1, ...req.query })} ORDER BY CREATED_DATE DESC`;

  connectWrapper({ isReadOnlyConnection: true })
    .then(queryWrapper({ queryString, isFinalQuery: true }))
    .then(({ result }) => res.status(200).json({ status: 'success', data: result }))
    .catch(next);
};

export const getByIdApi = table => (req, res, next) => {
  const queryString = `SELECT * FROM ${table} ${getWhere({ is_active: 1, id: req.params.id })} LIMIT 1`;

  connectWrapper({ isReadOnlyConnection: true })
    .then(queryWrapper({ queryString, isFinalQuery: true }))
    .then(({ result }) => res.status(200).json({ status: 'success', data: result[0] || null }))
    .catch(next);
};

export const createApi = (table, createProcedure, getCreateFields) => (req, res, next) => {
  connectWrapper({ isReadOnlyConnection: false, isTransaction: true })
    .then(queryWrapper({
      queryString: createProcedure,
      params: getCreateFields(req.body),
    }))
    .then(queryWrapper({ queryString: `SELECT * FROM ${table} WHERE id = LAST_INSERT_ID()`, isFinalQuery: true }))
    .then(({ result }) => res.status(201).json({ status: 'success', data: result[0] }))
    .catch(next);
};

export const updateApi = (table, updateProcedure, getUpdateFields) => (req, res, next) => {
  const { id } = req.params;

  connectWrapper({ isReadOnlyConnection: false, isTransaction: true })
    .then(queryWrapper({
      queryString: updateProcedure,
      params: getUpdateFields({ id, ...req.body }),
    }))
    .then(queryWrapper({ queryString: `SELECT * FROM ${table} ${getWhere({ id })}`, isFinalQuery: true }))
    .then(({ result }) => res.status(201).json({ status: 'success', data: result[0] }))
    .catch(next);
};


export const deleteApi = table => (req, res, next) => {
  const { id } = req.params;

  connectWrapper({ isReadOnlyConnection: false, isTransaction: true })
    .then(queryWrapper({
      queryString: 'CALL isActiveUpdate(?, ?, ?)',
      params: [table, id, 0],
      isFinalQuery: true,
    }))
    .then(() => res.status(201).json({ status: 'success', data: { deletedId: id } }))
    .catch(next);
};

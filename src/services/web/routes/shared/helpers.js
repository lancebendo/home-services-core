import { connectWrapper, queryWrapper } from '../../mysql';
import { getWhere } from '../../helpers';

export const getByMultipleApi = table => (req, res, next) => {
  const queryString = `SELECT * FROM ${table} ${getWhere({ is_active: 1, ...req.query })} ORDER BY CREATED_DATE DESC`;

  connectWrapper({ isReadOnlyConnection: true })
    .then(({ connection }) => queryWrapper(connection, queryString))
    .then(({ connection, result }) => {
      connection.end();
      res.status(200).json({ status: 'success', data: result[0] });
    })
    .catch(({ error }) => next(error));
};

export const getByIdApi = table => (req, res, next) => {
  const queryString = `SELECT * FROM ${table} ${getWhere({ is_active: 1, id: req.params.id })} LIMIT 1`;

  connectWrapper({ isReadOnlyConnection: true })
    .then(({ connection }) => queryWrapper(connection, queryString))
    .then(({ connection, result }) => {
      connection.end();
      res.status(200).json({ status: 'success', data: result[0] });
    })
    .catch(({ error }) => next(error));
};

export const createApi = (table, createProcedure, getCreateFields) => (req, res, next) => {
  connectWrapper({ isReadOnlyConnection: false, isTransaction: true })
    .then(({ connection }) => queryWrapper(
      connection,
      // `CALL ${createProcedure}(@new_id, ?, ?, ?)`,
      createProcedure,
      getCreateFields(req.body),
    ))
    .then(({ connection }) => queryWrapper(connection, `SELECT * FROM ${table} WHERE id = LAST_INSERT_ID()`))
    .then(({ connection, result }) => {
      connection.end();
      res.status(201).json({ status: 'success', data: result[0] });
    })
    .catch(({ connection, error }) => {
      connection.rollback();
      next(error);
    });
};

export const updateApi = (table, updateProcedure, getUpdateFields) => (req, res, next) => {
  const { id } = req.params;

  connectWrapper({ isReadOnlyConnection: false, isTransaction: true })
    .then(({ connection }) => queryWrapper(
      connection,
      // `CALL ${updateProcedure}(?, ?, ?)`,
      updateProcedure,
      getUpdateFields({ id, ...req.body }),
    ))
    .then(({ connection }) => queryWrapper(connection, `SELECT * FROM ${table} ${getWhere({ id })}`))
    .then(({ connection, result }) => {
      connection.end();
      res.status(201).json({ status: 'success', data: result[0] });
    })
    .catch(({ connection, error }) => {
      connection.rollback();
      next(error);
    });
};


export const deleteApi = table => (req, res, next) => {
  const { id } = req.params;

  connectWrapper({ isReadOnlyConnection: false, isTransaction: true })
    .then(({ connection }) => queryWrapper(
      connection,
      'CALL isActiveUpdate(?, ?, ?)',
      [table, id, 0],
    ))
    .then(({ connection }) => {
      connection.end();
      res.status(201).json({ status: 'success', data: { deletedId: id } });
    })
    .catch(({ connection, error }) => {
      connection.rollback();
      next(error);
    });
};

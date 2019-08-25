import express from 'express';

import { connectWrapper, queryWrapper } from '../mysql';
import { getWhere } from '../helpers';

const router = express.Router();

// GET /service?{filter} (get active services by filter. PUBLIC)
router.get('/', (req, res, next) => {
  const queryString = `SELECT * FROM service ${getWhere({ is_active: 1, ...req.query })} ORDER BY CREATED_DATE DESC`;

  connectWrapper({ isReadOnlyConnection: true })
    .then(({ connection }) => queryWrapper(connection, queryString))
    .then(({ connection, result }) => {
      connection.end();
      res.status(200).json({ status: 'success', data: result[0] });
    })
    .catch(({ error }) => next(error));
});

// GET /service/{id} (get service by id. PUBLIC)
router.get('/:id(\\d+)', (req, res, next) => {
  const queryString = `SELECT * FROM service ${getWhere({ is_active: 1, id: req.params.id })} LIMIT 1`;

  connectWrapper({ isReadOnlyConnection: true })
    .then(({ connection }) => queryWrapper(connection, queryString))
    .then(({ connection, result }) => {
      connection.end();
      res.status(200).json({ status: 'success', data: result[0] });
    })
    .catch(({ error }) => next(error));
});

// POST /service (create new service. ADMIN ONLY)
router.post('/', (req, res, next) => {
  const { name, description, is_subservice: isSubservice } = req.body;

  connectWrapper({ isReadOnlyConnection: false, isTransaction: true })
    .then(({ connection }) => queryWrapper(
      connection,
      'CALL serviceInsert(@new_id, ?, ?, ?)',
      [name, description, isSubservice === 'true' ? 1 : 0],
    ))
    .then(({ connection }) => queryWrapper(connection, 'SELECT * FROM service WHERE id = LAST_INSERT_ID()'))
    .then(({ connection, result }) => {
      connection.end();
      res.status(201).json({ status: 'success', data: result[0] });
    })
    .catch(({ connection, error }) => {
      connection.rollback();
      next(error);
    });
});

// PUT /service/{id} (update service. ADMIN ONLY)
router.put('/:id(\\d+)', (req, res, next) => {
  const { name, description } = req.body;
  const { id } = req.params;

  connectWrapper({ isReadOnlyConnection: false, isTransaction: true })
    .then(({ connection }) => queryWrapper(
      connection,
      'CALL serviceUpdate(?, ?, ?)',
      [id, name, description],
    ))
    .then(({ connection }) => queryWrapper(connection, `SELECT * FROM service ${getWhere({ id })}`))
    .then(({ connection, result }) => {
      connection.end();
      res.status(201).json({ status: 'success', data: result[0] });
    })
    .catch(({ connection, error }) => {
      connection.rollback();
      next(error);
    });
});

// DELETE /service/{id} (disable service. ADMIN ONLY)
router.delete('/:id(\\d+)', (req, res, next) => {
  const { id } = req.params;

  connectWrapper({ isReadOnlyConnection: false, isTransaction: true })
    .then(({ connection }) => queryWrapper(
      connection,
      'CALL isActiveUpdate(?, ?, ?)',
      ['service', id, 0],
    ))
    .then(({ connection }) => {
      connection.end();
      res.status(201).json({ status: 'success', data: { deletedId: id } });
    })
    .catch(({ connection, error }) => {
      connection.rollback();
      next(error);
    });
});

export default router;

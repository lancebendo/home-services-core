import express from 'express';
import boom from 'boom';

import {
  connectWrapper, connectWrapper2, queryWrapper, queryWrapper2,
} from '../mysql';
import {
  managementDomainParamValues,
  managementDomainUpdate,
  isActiveParamValues,
  isActiveUpdate,
} from '../mysql/procedures';
import { getWhere } from '../helpers';


const router = express.Router();

// GET /addon?{filter}/ (get active addons by filter. PUBLIC)
router.get('/', (req, res, next) => {
  const queryString = `SELECT * FROM ADDON ${getWhere({ is_active: 1, ...req.query })} ORDER BY CREATED_DATE DESC`;

  connectWrapper(next, queryWrapper(queryString, (results) => {
    res.status(200).json({ status: 'success', data: results });
  }));
});

// GET /addon/{id} (get addon by id. PUBLIC)
router.get('/:id(\\d+)', (req, res, next) => {
  const queryString = `SELECT * FROM ADDON ${getWhere({ id: req.params.id })} LIMIT 1`;

  connectWrapper(next, queryWrapper(queryString, (results) => {
    res.status(200).json({ status: 'success', data: results[0] });
  }));
});

// POST /addon (create new addon. ADMIN ONLY)
router.post('/', (req, res, next) => {
  const { name, description, is_subservice: isSubservice } = req.body;
  connectWrapper2({ isReadOnlyConnection: false, isTransaction: true })
    .then(({ connection }) => queryWrapper2(
      connection,
      'CALL serviceInsert(@new_id, ?, ?, ?)',
      [name, description, isSubservice === 'true' ? 1 : 0],
    ))
    .then(({ connection }) => queryWrapper2(connection, 'SELECT * FROM service WHERE id = LAST_INSERT_ID()'))
    .then(({ connection, result }) => {
      connection.end();
      res.status(201).json({ status: 'success', data: result[0] });
    })
    .catch(({ connection, error }) => {
      connection.rollback();
      next(error);
    });
});

// PUT /addon/{id} (update addon. ADMIN ONLY)
router.put('/:id(\\d+)/', (req, res, next) => {
  const queryString = `${managementDomainParamValues(1, req.params.id, 'addon', req.body.name, req.body.description)} 
  ${managementDomainUpdate(1)}`;

  connectWrapper(next, queryWrapper(queryString, () => queryWrapper(`SELECT * FROM ADDON ${getWhere({ id: req.params.id })} LIMIT 1`, (result) => {
    res.status(200).json({ status: 'success', data: result[0] });
  })), { isReadOnlyConnection: false, multipleStatements: true });
});

// PATCH (pano yung add as service addon of gantong service)
router.patch('/:id(\\d+)/', (req, res, next) => {
  next(boom.notImplemented('Wala pa eh'));
});

// DELETE /addon/{id} (disable addon. ADMIN ONLY)
router.delete('/:id(\\d+)/', (req, res, next) => {
  const queryString = `${isActiveParamValues(1, 'addon', req.params.id, 0)} 
  ${isActiveUpdate(1)}`;

  connectWrapper(next, queryWrapper(queryString, () => {
    res.status(200).json({ status: 'success', data: { deletedDomain: 'addon', deletedId: req.params.id } });
  }), { isReadOnlyConnection: false, multipleStatements: true });
});

export default router;

import express from 'express';
import boom from 'boom';

import { connectWrapper, queryWrapper } from '../mysql';
import {
  managementDomainParamValues,
  managementDomainInsert,
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
  const queryString = `${managementDomainParamValues(1, 0, 'addon', req.body.name, req.body.description)} 
  ${managementDomainInsert(1)}`;

  connectWrapper(next, queryWrapper(queryString, () => queryWrapper('SELECT LAST_INSERT_ID() id', (idResult) => {
    res.status(201).json({ status: 'success', data: idResult[0] });
  })), { isReadOnlyConnection: false, multipleStatements: true });
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

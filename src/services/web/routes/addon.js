import express from 'express';

import boom from 'boom';
import { connectWrapper, queryWrapper } from '../mysql';
import { managementDomainParamValues, managementDomainInsert } from '../mysql/procedures';
import { getWhere } from '../helpers';


const router = express.Router();

// GET /addon?{filter}/ (get active addons by filter. PUBLIC)
router.get('/', (req, res, next) => {
  const queryString = `SELECT * FROM ADDON ${getWhere(req.query)} ORDER BY CREATED_DATE DESC`;

  connectWrapper(next, queryWrapper(queryString, (results) => {
    res.status(200).json({ status: 'success', data: results });
  }));
});

// GET /addon/{id} (get addon by id. PUBLIC)
router.get('/:id(\\d+)', (req, res, next) => {
  const queryString = `SELECT * FROM ADDON ${getWhere({ id: req.params.id })}`;

  connectWrapper(next, queryWrapper(queryString, (results) => {
    res.status(200).json({ status: 'success', data: results });
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
  next(boom.notImplemented('wala pa'));
});

// PATCH (pano yung add as service addon of gantong service)
router.patch('/:id(\\d+)/', (req, res, next) => {
  next();
});

// DELETE /addon/{id} (disable addon. ADMIN ONLY)
router.delete('/:id(\\d+)/', (req, res, next) => {
  next();
});

export default router;

import express from 'express';

import mysql from '../mysql';
import { getWhere } from '../helpers';

const router = express.Router();

// GET /addon?{filter}/ (get active addons by filter. PUBLIC)
router.get('/', (req, res, next) => {
  const queryString = `SELECT * FROM USER ${getWhere(req.query)} ORDER BY CREATED_DATE DESC`;
  const connection = mysql();
  connection.connect((err) => {
    if (err) next(err);
  });
  console.log(req.query);
  console.log(queryString);

  connection.query(queryString, (err, results) => {
    if (err) next(err);
    res.status(200).json({ status: 'success', data: results });
  });

  connection.end((err) => {
    if (err) next(err);
  });
});

// GET /addon/{id} (get addon by id. PUBLIC)
router.get('/:id', (req, res, next) => {
  next();
});

// POST /addon (create new addon. ADMIN ONLY)
router.post('/', (req, res, next) => {
  next();
});

// PUT /addon/{id} (update addon. ADMIN ONLY)
router.put('/:id/', (req, res, next) => {
  next();
});

// PATCH (pano yung add as service addon of gantong service)
router.patch('/:id/', (req, res, next) => {
  next();
});

// DELETE /addon/{id} (disable addon. ADMIN ONLY)
router.delete('/:id/', (req, res, next) => {
  next();
});

export default router;

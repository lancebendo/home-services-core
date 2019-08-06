import express from 'express';

const router = express.Router();

// GET /addon?{filter}/ (get active addons by filter. PUBLIC)
router.get('/', (req, res, next) => {
  next();
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

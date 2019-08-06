import express from 'express';

const router = express.Router();

// GET /service?{filter} (get active services by filter. PUBLIC)
router.get('/', (req, res, next) => {
  next();
});

// GET /service/{id} (get service by id. PUBLIC)
router.get('/:id', (req, res, next) => {
  next();
});

// POST /service (create new service. ADMIN ONLY)
router.post('/', (req, res, next) => {
  next();
});

// PUT /service/{id} (update service. ADMIN ONLY)
router.put('/:id/', (req, res, next) => {
  next();
});

// DELETE /service/{id} (disable service. ADMIN ONLY)
router.delete('/:id/', (req, res, next) => {
  next();
});

export default router;

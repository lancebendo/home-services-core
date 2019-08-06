import express from 'express';

const router = express.Router();

// GET /completed?{filter} (get reservations by filter. ADMIN ONLY.)
router.get('/', (req, res, next) => {
  next();
});

// GET /completed/{id} (get reservation by id. ADMIN ONLY.)
router.get('/:id', (req, res, next) => {
  next();
});

// DELETE /completed/{id} (disable completed session. ADMIN ONLY)
router.delete('/:id/', (req, res, next) => {
  next();
});

export default router;

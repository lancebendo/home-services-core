import express from 'express';

// import { getByMultipleApi, getByIdApi, deleteApi } from './shared';


const router = express.Router();
// GET LANG LAHAT DITO.

// GET /completed?{filter} (get reservations by filter. ADMIN ONLY.)
// router.get('/', getByMultipleApi('completed_session'));

// GET /completed/{id} (get reservation by id. ADMIN ONLY.)
// router.get('/:id(\\d+)', getByIdApi('completed_session'));

// DELETE /completed/{id} (disable completed session. ADMIN ONLY)
// router.delete('/:id(\\d+)', deleteApi('completed_session'));

export default router;

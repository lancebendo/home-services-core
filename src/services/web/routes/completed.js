import express from 'express';

// import { getByMultipleApi, getByIdApi, deleteApi } from './shared';


const router = express.Router();
// GET LANG LAHAT DITO.

// GET /completed?{filter} (get reservations by filter. ADMIN ONLY.)
router.get('/');

// GET /completed/{id} (get reservation by id. ADMIN ONLY.)
router.get('/:id(\\d+)');


export default router;

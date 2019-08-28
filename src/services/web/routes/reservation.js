import { createCrudApi } from './shared';

const router = createCrudApi({
  table: 'reservation',
  createProcedure: 'CALL reservationInsert(@new_id, ?, ?, ?, ?, ?)',
  updateProcedure: 'CALL reservationUpdate(?, ?, ?, ?, ?)',
});


/* PATCH /reservation/{id} (make a completed session out of
    this reservation. ADMIN ONLY or provider) */
router.patch('/:id(\\d+)', (req, res, next) => {
  next();
});


// //////////////// RESERVATION SERVICES ////////////////////
router.get('/:id(\\d+)/services');
router.post('/:id(\\d+)/services');
router.delete('/:id(\\d+)/services');


// //////////////// RESERVATION USER ASSIGNMENT ////////////////////
router.get('/:id(\\d+)/service-provider');
router.post('/:id(\\d+)/service-provider');
router.delete('/:id(\\d+)/service-provider');

export default router;

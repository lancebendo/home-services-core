import { getDomainRouter } from 'express-mysql-helpers';

const router = getDomainRouter({
  viewTable: 'reservation',
  createProcedure: {
    query: 'CALL reservationInsert(@new_id, ?, ?, ?, ?, ?)',
  },
  updateProcedure: {
    query: 'CALL reservationUpdate(?, ?, ?, ?, ?)',
  },
});


/* PATCH /reservation/{id} (make a completed session out of
    this reservation. ADMIN ONLY or provider) */
router.patch('/:id(\\d+)', (req, res, next) => {
  next();
});


// //////////////// RESERVATION SERVICES ////////////////////
// reservationServiceInsert
// reservationServiceDelete

router.get('/:id(\\d+)/services');
router.post('/:id(\\d+)/services');
router.delete('/:id(\\d+)/services');


// //////////////// RESERVATION USER ASSIGNMENT ////////////////////
// getters only
router.get('/:id(\\d+)/service-provider');
// router.post('/:id(\\d+)/service-provider'); dapat sa user route tong mga operation na to
// router.delete('/:id(\\d+)/service-provider'); pati ito.

export default router;

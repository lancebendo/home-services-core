import express from 'express';
import { procedureApi, getApi, getWhere } from 'express-mysql-helpers';
// import { getByMultipleApi, getByIdApi, deleteApi } from './shared';


const router = express.Router();
// GET LANG LAHAT DITO.

// GET /completed?{filter} (get reservations by filter. ADMIN ONLY.)
router.get('/', getApi({
  query: params => `SELECT * FROM completed_session ${getWhere(params)}`,
}));

// GET /completed/{id} (get reservation by id. ADMIN ONLY.)
router.get('/:id(\\d+)', getApi({
  query: params => `SELECT * FROM completed_session ${getWhere(params)} LIMIT 1`,
  resultHandler: result => result[0][0],
}));

router.get('/:id(\\d+)/service', procedureApi({
  query: `SELECT service.* FROM service 
    INNER JOIN completed_session_service 
    ON completed_session_service.service_id = service.id
    WHERE completed_session_service.completed_session_id = ?`,
  paramsHandler: ({ id }) => [id],
}));
router.get('/:id(\\d+)/service-provider', procedureApi({
  query: `SELECT completed_session.id as completed_session_id, reservation.* FROM user 
    INNER JOIN user_provider_assignment 
    ON user_provider_assignment.user_provider_id = user.id
    INNER JOIN reservation 
    ON user_provider_assignment.reservation_id = reservation.id
    INNER JOIN completed_session
    ON completed_session.reservation_id = reservation.id
    WHERE completed_session.id = ?`,
  paramsHandler: ({ id }) => [id],
}));

export default router;

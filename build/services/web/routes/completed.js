"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressMysqlHelpers = require("express-mysql-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { getByMultipleApi, getByIdApi, deleteApi } from './shared';
const router = _express.default.Router(); // GET LANG LAHAT DITO.
// GET /completed?{filter} (get reservations by filter. ADMIN ONLY.)


router.get('/', (0, _expressMysqlHelpers.getApi)({
  query: params => `SELECT * FROM completed_session ${(0, _expressMysqlHelpers.getWhere)(params)}`
})); // GET /completed/{id} (get reservation by id. ADMIN ONLY.)

router.get('/:id(\\d+)', (0, _expressMysqlHelpers.getApi)({
  query: params => `SELECT * FROM completed_session ${(0, _expressMysqlHelpers.getWhere)(params)} LIMIT 1`,
  resultHandler: result => result[0][0]
}));
router.get('/:id(\\d+)/service', (0, _expressMysqlHelpers.procedureApi)({
  query: `SELECT service.* FROM service 
    INNER JOIN completed_session_service 
    ON completed_session_service.service_id = service.id
    WHERE completed_session_service.completed_session_id = ?`,
  paramsHandler: ({
    id
  }) => [id]
}));
router.get('/:id(\\d+)/service-provider', (0, _expressMysqlHelpers.procedureApi)({
  query: `SELECT completed_session.id as completed_session_id, reservation.* FROM user 
    INNER JOIN user_provider_assignment 
    ON user_provider_assignment.user_provider_id = user.id
    INNER JOIN reservation 
    ON user_provider_assignment.reservation_id = reservation.id
    INNER JOIN completed_session
    ON completed_session.reservation_id = reservation.id
    WHERE completed_session.id = ?`,
  paramsHandler: ({
    id
  }) => [id]
}));
var _default = router;
exports.default = _default;
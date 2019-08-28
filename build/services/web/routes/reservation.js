"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shared = require("./shared");

const router = (0, _shared.createCrudApi)({
  table: 'reservation',
  createProcedure: 'CALL reservationInsert(@new_id, ?, ?, ?, ?, ?)',
  updateProcedure: 'CALL reservationUpdate(?, ?, ?, ?, ?)'
});
/* PATCH /reservation/{id} (make a completed session out of
    this reservation. ADMIN ONLY or provider) */

router.patch('/:id(\\d+)', (req, res, next) => {
  next();
}); // //////////////// RESERVATION SERVICES ////////////////////

router.get('/:id(\\d+)/services');
router.post('/:id(\\d+)/services');
router.delete('/:id(\\d+)/services'); // //////////////// RESERVATION USER ASSIGNMENT ////////////////////

router.get('/:id(\\d+)/service-provider');
router.post('/:id(\\d+)/service-provider');
router.delete('/:id(\\d+)/service-provider');
var _default = router;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); // GET /reservation?{filter} (get reservations by filter. ADMIN ONLY.)


router.get('/', (req, res, next) => {
  next();
}); // GET /reservation/{id} (get reservation by id. ADMIN ONLY.)

router.get('/:id', (req, res, next) => {
  next();
}); // POST /reservation (create new reservation. doable to ADMIN or the user itself.)

router.post('/', (req, res, next) => {
  next();
}); // PUT /reservation/{id} (update reservation. ADMIN ONLY)

router.put('/:id/', (req, res, next) => {
  next();
});
/* PATCH /reservation/{id} (make a completed session out of
    this reservation. ADMIN ONLY or provider) */

router.patch('/:id/', (req, res, next) => {
  next();
}); // DELETE /reservation/{id} (disable reservation. ADMIN ONLY)

router.delete('/:id/', (req, res, next) => {
  next();
});
var _default = router;
exports.default = _default;
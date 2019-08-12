"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); // GET /completed?{filter} (get reservations by filter. ADMIN ONLY.)


router.get('/', (req, res, next) => {
  next();
}); // GET /completed/{id} (get reservation by id. ADMIN ONLY.)

router.get('/:id', (req, res, next) => {
  next();
}); // DELETE /completed/{id} (disable completed session. ADMIN ONLY)

router.delete('/:id/', (req, res, next) => {
  next();
});
var _default = router;
exports.default = _default;
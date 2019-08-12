"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); // GET /service?{filter} (get active services by filter. PUBLIC)


router.get('/', (req, res, next) => {
  next();
}); // GET /service/{id} (get service by id. PUBLIC)

router.get('/:id', (req, res, next) => {
  next();
}); // POST /service (create new service. ADMIN ONLY)

router.post('/', (req, res, next) => {
  next();
}); // PUT /service/{id} (update service. ADMIN ONLY)

router.put('/:id/', (req, res, next) => {
  next();
}); // DELETE /service/{id} (disable service. ADMIN ONLY)

router.delete('/:id/', (req, res, next) => {
  next();
});
var _default = router;
exports.default = _default;
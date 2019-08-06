"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // GET /promo/{filter} (get active promos by filter. PUBLIC)


router.get('/', function (req, res, next) {
  next();
}); // GET /promo/{id} (get promo by id. PUBLIC)

router.get('/:id', function (req, res, next) {
  next();
}); // POST /promo (create new promo. ADMIN ONLY)

router.post('/', function (req, res, next) {
  next();
}); // PUT /promo/{id} (update promo. ADMIN ONLY)

router.put('/:id/', function (req, res, next) {
  next();
});
/* PATCH /promo/{id}/{condition. apply/remove, mngmnt-domain-type,
                        domain-id} (apply/remove promo. ADMIN ONLY) */

router.patch('/:id/', function (req, res, next) {
  next();
}); // DELETE /promo/{id} (disable promo. ADMIN ONLY)

router["delete"]('/:id/', function (req, res, next) {
  next();
});
var _default = router;
exports["default"] = _default;
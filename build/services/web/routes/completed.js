"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // GET /completed?{filter} (get reservations by filter. ADMIN ONLY.)


router.get('/', function (req, res, next) {
  next();
}); // GET /completed/{id} (get reservation by id. ADMIN ONLY.)

router.get('/:id', function (req, res, next) {
  next();
}); // DELETE /completed/{id} (disable completed session. ADMIN ONLY)

router["delete"]('/:id/', function (req, res, next) {
  next();
});
var _default = router;
exports["default"] = _default;
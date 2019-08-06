"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // GET /addon?{filter}/ (get active addons by filter. PUBLIC)


router.get('/', function (req, res, next) {
  next();
}); // GET /addon/{id} (get addon by id. PUBLIC)

router.get('/:id', function (req, res, next) {
  next();
}); // POST /addon (create new addon. ADMIN ONLY)

router.post('/', function (req, res, next) {
  next();
}); // PUT /addon/{id} (update addon. ADMIN ONLY)

router.put('/:id/', function (req, res, next) {
  next();
}); // PATCH (pano yung add as service addon of gantong service)

router.patch('/:id/', function (req, res, next) {
  next();
}); // DELETE /addon/{id} (disable addon. ADMIN ONLY)

router["delete"]('/:id/', function (req, res, next) {
  next();
});
var _default = router;
exports["default"] = _default;
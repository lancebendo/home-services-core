"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _mysql = require("../mysql");

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // GET /addon?{filter}/ (get active addons by filter. PUBLIC)


router.get('/', function (req, res, next) {
  var queryString = "SELECT * FROM USER ".concat((0, _helpers.getWhere)(req.query), " ORDER BY CREATED_DATE DESC");
  var connection = (0, _mysql.createConnection)(true);
  connection.connect(function (err) {
    if (err) next(err);
  });
  console.log(req.query);
  console.log(queryString);
  connection.query(queryString, function (err, results) {
    if (err) next(err);
    res.status(200).json({
      status: 'success',
      data: results
    });
  });
  connection.end(function (err) {
    if (err) next(err);
  });
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
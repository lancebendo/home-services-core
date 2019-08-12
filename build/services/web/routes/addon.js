"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _boom = _interopRequireDefault(require("boom"));

var _mysql = require("../mysql");

var _procedures = require("../mysql/procedures");

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); // GET /addon?{filter}/ (get active addons by filter. PUBLIC)


router.get('/', (req, res, next) => {
  const queryString = `SELECT * FROM ADDON ${(0, _helpers.getWhere)(req.query)} ORDER BY CREATED_DATE DESC`;
  (0, _mysql.connectWrapper)(next, (0, _mysql.queryWrapper)(queryString, results => {
    res.status(200).json({
      status: 'success',
      data: results
    });
  }));
}); // GET /addon/{id} (get addon by id. PUBLIC)

router.get('/:id(\\d+)', (req, res, next) => {
  const queryString = `SELECT * FROM ADDON ${(0, _helpers.getWhere)({
    id: req.params.id
  })}`;
  (0, _mysql.connectWrapper)(next, (0, _mysql.queryWrapper)(queryString, results => {
    res.status(200).json({
      status: 'success',
      data: results
    });
  }));
}); // POST /addon (create new addon. ADMIN ONLY)

router.post('/', (req, res, next) => {
  const queryString = `${(0, _procedures.managementDomainParamValues)(1, 0, 'addon', req.body.name, req.body.description)} 
  ${(0, _procedures.managementDomainInsert)(1)}`;
  (0, _mysql.connectWrapper)(next, (0, _mysql.queryWrapper)(queryString, results => {
    res.status(201).json({
      status: 'success',
      data: results[1].insertId
    });
  }), {
    isReadOnlyConnection: false,
    multipleStatements: true
  });
}); // PUT /addon/{id} (update addon. ADMIN ONLY)

router.put('/:id(\\d+)/', (req, res, next) => {
  next(_boom.default.notImplemented('wala pa'));
}); // PATCH (pano yung add as service addon of gantong service)

router.patch('/:id(\\d+)/', (req, res, next) => {
  next();
}); // DELETE /addon/{id} (disable addon. ADMIN ONLY)

router.delete('/:id(\\d+)/', (req, res, next) => {
  next();
});
var _default = router;
exports.default = _default;
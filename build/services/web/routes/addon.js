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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const router = _express.default.Router(); // GET /addon?{filter}/ (get active addons by filter. PUBLIC)


router.get('/', (req, res, next) => {
  const queryString = `SELECT * FROM ADDON ${(0, _helpers.getWhere)(_objectSpread({
    is_active: 1
  }, req.query))} ORDER BY CREATED_DATE DESC`;
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
  })} LIMIT 1`;
  (0, _mysql.connectWrapper)(next, (0, _mysql.queryWrapper)(queryString, results => {
    res.status(200).json({
      status: 'success',
      data: results[0]
    });
  }));
}); // POST /addon (create new addon. ADMIN ONLY)

router.post('/', (req, res, next) => {
  const queryString = `${(0, _procedures.managementDomainParamValues)(1, 0, 'addon', req.body.name, req.body.description)} 
  ${(0, _procedures.managementDomainInsert)(1)}`;
  (0, _mysql.connectWrapper)(next, (0, _mysql.queryWrapper)(queryString, () => (0, _mysql.queryWrapper)('SELECT LAST_INSERT_ID() id', idResult => {
    res.status(201).json({
      status: 'success',
      data: idResult[0]
    });
  })), {
    isReadOnlyConnection: false,
    multipleStatements: true
  });
}); // PUT /addon/{id} (update addon. ADMIN ONLY)

router.put('/:id(\\d+)/', (req, res, next) => {
  const queryString = `${(0, _procedures.managementDomainParamValues)(1, req.params.id, 'addon', req.body.name, req.body.description)} 
  ${(0, _procedures.managementDomainUpdate)(1)}`;
  (0, _mysql.connectWrapper)(next, (0, _mysql.queryWrapper)(queryString, () => (0, _mysql.queryWrapper)(`SELECT * FROM ADDON ${(0, _helpers.getWhere)({
    id: req.params.id
  })} LIMIT 1`, result => {
    res.status(200).json({
      status: 'success',
      data: result[0]
    });
  })), {
    isReadOnlyConnection: false,
    multipleStatements: true
  });
}); // PATCH (pano yung add as service addon of gantong service)

router.patch('/:id(\\d+)/', (req, res, next) => {
  next(_boom.default.notImplemented('Wala pa eh'));
}); // DELETE /addon/{id} (disable addon. ADMIN ONLY)

router.delete('/:id(\\d+)/', (req, res, next) => {
  const queryString = `${(0, _procedures.isActiveParamValues)(1, 'addon', req.params.id, 0)} 
  ${(0, _procedures.isActiveUpdate)(1)}`;
  (0, _mysql.connectWrapper)(next, (0, _mysql.queryWrapper)(queryString, () => {
    res.status(200).json({
      status: 'success',
      data: {
        deletedDomain: 'addon',
        deletedId: req.params.id
      }
    });
  }), {
    isReadOnlyConnection: false,
    multipleStatements: true
  });
});
var _default = router;
exports.default = _default;
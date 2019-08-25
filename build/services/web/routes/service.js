"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _mysql = require("../mysql");

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router(); // GET /service?{filter} (get active services by filter. PUBLIC)


router.get('/', (req, res, next) => {
  next();
}); // GET /service/{id} (get service by id. PUBLIC)

router.get('/:id(\\d+)', (req, res, next) => {
  console.log('hahahahaha');
  const queryString = `SELECT * FROM service ${(0, _helpers.getWhere)({
    id: req.params.id
  })} LIMIT 1`;
  (0, _mysql.connectWrapper)({
    isReadOnlyConnection: true
  }).then(({
    connection
  }) => (0, _mysql.queryWrapper)(connection, queryString)).then(({
    connection,
    result
  }) => {
    connection.end();
    res.status(200).json({
      status: 'success',
      data: result[0]
    });
  }).catch(({
    error
  }) => {
    console.log(error);
    next(error);
  });
}); // POST /service (create new service. ADMIN ONLY)

router.post('/', (req, res, next) => {
  const {
    name,
    description,
    is_subservice: isSubservice
  } = req.body;
  (0, _mysql.connectWrapper)({
    isReadOnlyConnection: false,
    isTransaction: true
  }).then(({
    connection
  }) => (0, _mysql.queryWrapper)(connection, 'CALL serviceInsert(@new_id, ?, ?, ?)', [name, description, isSubservice === 'true' ? 1 : 0])).then(({
    connection
  }) => (0, _mysql.queryWrapper)(connection, 'SELECT * FROM service WHERE id = LAST_INSERT_ID()')).then(({
    connection,
    result
  }) => {
    connection.end();
    res.status(201).json({
      status: 'success',
      data: result[0]
    });
  }).catch(({
    connection,
    error
  }) => {
    connection.rollback();
    next(error);
  });
}); // PUT /service/{id} (update service. ADMIN ONLY)

router.put('/:id/', (req, res, next) => {
  next();
}); // DELETE /service/{id} (disable service. ADMIN ONLY)

router.delete('/:id/', (req, res, next) => {
  next();
});
var _default = router;
exports.default = _default;
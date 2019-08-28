"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shared = require("./shared");

var _mysql = require("../mysql");

const router = (0, _shared.createCrudApi)({
  table: 'service',
  createProcedure: 'CALL serviceInsert(@new_id, ?, ?, ?)',
  getCreateFields: ({
    name,
    description,
    is_subservice: isSubservice
  }) => [name, description, isSubservice === 'true' ? 1 : 0],
  updateProcedure: 'CALL serviceUpdate(?, ?, ?)'
});
router.get('/:id(\\d+)/rates');
router.post('/:id(\\d+)/rates'); // PATCH (pano yung add as service addon of gantong service)

router.patch('/:serviceId(\\d+)/subservice/:subserviceId(\\d+)', (req, res, next) => {
  const {
    serviceId,
    subserviceId
  } = req.params;
  (0, _mysql.connectWrapper)({
    isReadOnlyConnection: false,
    isTransaction: true
  }).then(({
    connection
  }) => (0, _mysql.queryWrapper)(connection, 'CALL serviceSubserviceInsert(@newServiceSubserviceId, ?, ?)', [serviceId, subserviceId])).then(({
    connection
  }) => (0, _mysql.queryWrapper)(connection, 'SELECT LAST_INSERT_ID()')).then(({
    connection,
    result
  }) => {
    connection.end();
    res.status(201).json({
      status: 'success',
      data: result[0]
    });
  }).catch(next);
});
var _default = router;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressMysqlHelpers = require("express-mysql-helpers");

const router = (0, _expressMysqlHelpers.getDomainRouter)({
  viewTable: 'service',
  createProcedure: {
    query: 'CALL serviceInsert(@new_id, ?, ?, ?)',
    paramsHandler: ({
      name,
      description,
      is_subservice: isSubservice
    }) => [name, description, isSubservice === 'true' ? 1 : 0]
  },
  updateProcedure: {
    query: 'CALL serviceUpdate(?, ?, ?)',
    paramsHandler: ({
      id,
      name,
      description
    }) => [id, name, description]
  },
  deleteProcedure: {
    query: 'CALL isActiveUpdate(?, ?, ?)',
    paramsHandler: ({
      id
    }) => ['service', id, 0]
  } // middlewares here.

});
router.get('/:id(\\d+)/rates');
router.post('/:id(\\d+)/rates'); // PATCH (pano yung add as service addon of gantong service)

router.patch('/:serviceId(\\d+)/subservice/:subserviceId(\\d+)', (req, res, next) => {
  const {
    serviceId,
    subserviceId
  } = req.params;
  (0, _expressMysqlHelpers.connectWrapper)({
    isReadOnlyConnection: false,
    isTransaction: true
  }).then(({
    connection
  }) => (0, _expressMysqlHelpers.queryWrapper)(connection, 'CALL serviceSubserviceInsert(@newServiceSubserviceId, ?, ?)', [serviceId, subserviceId])).then(({
    connection
  }) => (0, _expressMysqlHelpers.queryWrapper)(connection, 'SELECT LAST_INSERT_ID()')).then(({
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("../helpers");

const router = (0, _helpers.getDomainRouter)({
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

}); // PATCH (pano yung add as service addon of gantong service)
// router.patch('/:serviceId(\\d+)/subservice/:subserviceId(\\d+)', (req, res, next) => {
//   const { serviceId, subserviceId } = req.params;
//   connectWrapper({ isReadOnlyConnection: false, isTransaction: true })
//     .then(({ connection }) => queryWrapper(
//       connection,
//       'CALL serviceSubserviceInsert(@newServiceSubserviceId, ?, ?)',
//       [serviceId, subserviceId],
//     ))
//     .then(({ connection }) => queryWrapper(connection, 'SELECT LAST_INSERT_ID()'))
//     .then(({ connection, result }) => {
//       connection.end();
//       res.status(201).json({ status: 'success', data: result[0] });
//     })
//     .catch(next);
// });
// rates
// serviceRateInsert

router.get('/:serviceId(\\d+)/rate/history', (0, _helpers.procedureApi)({
  query: 'SELECT * FROM service_rate where service_id = ?',
  paramsHandler: ({
    serviceId
  }) => [serviceId]
})); // many

router.get('/:serviceId(\\d+)/rate', (0, _helpers.procedureApi)({
  query: 'SELECT * FROM service_rate where last_date IS NULL AND service_id = ?',
  paramsHandler: ({
    serviceId
  }) => [serviceId]
})); // one lang. yung active

router.post('/:id(\\d+)/rate', (0, _helpers.procedureApi)({
  query: 'CALL serviceRateInsert(@new_id, ?, ?); SELECT * FROM service_rate where id = LAST_INSERT_ID()',
  paramsHandler: ({
    id,
    rate
  }) => [id, rate],
  resultHandler: result => result[1],
  responseCode: 201
})); // subservices
// serviceSubserviceInsert
// router.get('/:serviceId(\\d+)/subservice');
// router.post('/:id(\\d+)/subservice', procedureApi({
//   query: 'CALL serviceSubserviceInsert(@new_id, ?, ?)',
//   paramsHandler: ({ id, service_subservice_id: serviceSubserviceId
// }) => [id, serviceSubserviceId],
// }));
// router.delete('/:serviceId(\\d+)/subservice/:serviceSubserviceId(\\d+)', procedureApi({
//   query: 'CALL serviceSubserviceDelete(?, ?)',
//   paramsHandler: ({ serviceId, serviceSubserviceId }) => [serviceId, serviceSubserviceId],
// }));

var _default = router;
exports.default = _default;
import { createCrudApi } from './shared';

import { connectWrapper, queryWrapper } from '../mysql';

const router = createCrudApi({
  table: 'service',
  createProcedure: 'CALL serviceInsert(@new_id, ?, ?, ?)',
  getCreateFields: ({ name, description, is_subservice: isSubservice }) => [name, description, isSubservice === 'true' ? 1 : 0],
  updateProcedure: 'CALL serviceUpdate(?, ?, ?)',
});

// PATCH (pano yung add as service addon of gantong service)
router.patch('/:serviceId(\\d+)/addon/:addonId(\\d+)', (req, res, next) => {
  const { serviceId, addonId } = req.params;

  connectWrapper({ isReadOnlyConnection: false, isTransaction: true })
    .then(({ connection }) => queryWrapper(
      connection,
      'CALL serviceSubserviceInsert(@newServiceSubserviceId, ?, ?)',
      [serviceId, addonId],
    ))
    .then(({ connection }) => queryWrapper(connection, 'SELECT LAST_INSERT_ID()'))
    .then(({ connection, result }) => {
      connection.end();
      res.status(201).json({ status: 'success', data: result[0] });
    })
    .catch(({ connection, error }) => {
      connection.rollback();
      next(error);
    });
});

export default router;

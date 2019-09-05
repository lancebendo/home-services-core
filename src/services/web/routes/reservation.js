import { getDomainRouter, procedureApi } from 'express-mysql-helpers';

const router = getDomainRouter({
  viewTable: 'reservation',
  createProcedure: {
    query: 'CALL reservationInsert(@new_id, ?, ?, ?, ?, ?)',
    paramsHandler: ({
      user_id: userId,
      address_id: addressId,
      status,
      initial_date: initialDate,
      additional_note: additionalNote,
    }) => [userId, addressId, status, initialDate, additionalNote],
  },
  updateProcedure: {
    query: 'CALL reservationUpdate(?, ?, ?, ?, ?)',
    paramsHandler: ({
      id,
      address_id: addressId,
      status,
      initial_date: initialDate,
      additional_note: additionalNote,
    }) => [id, addressId, status, initialDate, additionalNote],
  },
  deleteProcedure: {
    query: 'CALL isActiveUpdate(?, ?, ?)',
    paramsHandler: ({ id }) => ['reservation', id, 0],
  },
});

// //////////////// RESERVATION SERVICES ////////////////////
// get all
// reservationServiceInsert
// reservationServiceDelete
router.get('/:id(\\d+)/service', procedureApi({
  query: `SELECT service.* FROM service 
  INNER JOIN reservation_service 
  ON reservation_service.service_id = service.id
  WHERE reservation_service.reservation_id = ?`,
  paramsHandler: ({ id }) => [id],
}));

router.post('/:id(\\d+)/service', procedureApi({
  query: 'CALL reservationServiceInsert(?, ?)',
  paramsHandler: ({ id, service_subservice_id: serviceSubserviceId }) => [id, serviceSubserviceId],
}));
router.delete('/:id(\\d+)/services', procedureApi({
  query: 'CALL reservationServiceDelete(?, ?)',
  paramsHandler: ({ id, service_subservice_id: serviceSubserviceId }) => [id, serviceSubserviceId],
}));


// //////////////// RESERVATION USER ASSIGNMENT ////////////////////
// get all
// userProviderAssignmentInsert
// userProviderAssignmentDelete
router.get('/:id(\\d+)/service-provider', procedureApi({
  query: `SELECT user.* FROM user 
  INNER JOIN user_provider_assignment 
  ON user_provider_assignment.user_provider_id = user.id 
  WHERE user_provider_assignment.reservation_id = ?`,
  paramsHandler: ({ id }) => [id],
}));

router.post('/:id(\\d+)/service-provider', procedureApi({
  query: 'CALL userProviderAssignmentInsert(?, ?, ?)',
  paramsHandler: ({
    user_provider_id: userProviderId, id, recurrency_number: recurrencyNumber,
  }) => [userProviderId, id, recurrencyNumber],
}));

router.delete('/:reservationId(\\d+)/service-provider/:serviceProviderId(\\d+)', procedureApi({
  query: 'CALL userProviderAssignmentDelete(?, ?, ?)',
  paramsHandler: ({
    serviceProviderId, reservationId, recurrency_number: recurrencyNumber,
  }) => [serviceProviderId, reservationId, recurrencyNumber],
}));
export default router;

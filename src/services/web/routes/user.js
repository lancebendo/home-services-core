import { getDomainRouter, procedureApi } from 'express-mysql-helpers';
// import { getWhere } from '../helpers';


const router = getDomainRouter({
  viewTable: 'user',
  createProcedure: {
    query: 'CALL userInsert(@new_id, ?, ?, ?, ?, ?, ?)',
    paramsHandler: ({
      firstname,
      lastname,
      date_of_birth: dateOfBirth,
      gender,
      email,
      contact_number: contactNumber,
    }) => [firstname, lastname, dateOfBirth, gender, email, contactNumber],
  },
  updateProcedure: {
    query: 'CALL userUpdate(?, ?, ?, ?, ?, ?, ?)',
    paramsHandler: ({
      id,
      firstname,
      lastname,
      date_of_birth: dateOfBirth,
      gender,
      email,
      contact_number: contactNumber,
    }) => [id, firstname, lastname, dateOfBirth, gender, email, contactNumber],
  },
  deleteProcedure: {
    query: 'CALL isActiveUpdate(?, ?, ?)',
    paramsHandler: ({ id }) => ['user', id, 0],
  },
});

// ACCESS LEVEL ////////////////////////////////////
// userAccessLevelUpdate
router.patch('/:id(\\d+)');


//  ADDRESS  /////////////////////////////////////
// addressInsert
router.post('/:id(\\d+)/address', procedureApi({
  query: `CALL addressInsert(@new_id, ?, ?, ?, ?, ?, ?, ?); 
  SELECT * FROM address where id = LAST_INSERT_ID(); 
  CALL userAddressInsertOrUpdate(?, LAST_INSERT_(), ?);`,
  paramsHandler: ({
    id,
    province,
    city,
    barangay,
    room_number: roomNumber,
    bldg_number: bldgNumber,
    zip,
    landmark,
    is_default: isDefault,
  }) => [province, city, barangay, roomNumber, bldgNumber, zip, landmark, id, isDefault ? 1 : 0],
  resultHandler: result => result[1],
  responseCode: 201,
}));

// addressUpdate
router.put('/:userId(\\d+)/address/:addressId(\\d+)', procedureApi({
  query: `CALL addressUpdate(?, ?, ?, ?, ?, ?, ?, ?); 
  SELECT * FROM address where id = ?`,
  paramsHandler: ({
    userId,
    addressId,
    province,
    city,
    barangay,
    room_number: roomNumber,
    bldg_number: bldgNumber,
    zip,
    landmark,
  }) => [
    userId,
    addressId,
    province,
    city,
    barangay,
    roomNumber,
    bldgNumber,
    zip,
    landmark,
    addressId],
  resultHandler: result => result[1],
}));

// userAddressDelete
router.delete('/:userId(\\d+)/address/:addressId(\\d+)', procedureApi({
  query: 'CALL userAddressDelete(?, ?)',
  paramsHandler: ({ userId, addressId }) => [userId, addressId],
}));
// userAddressInsertOrUpdate
router.patch('/:userId(\\d+)/address/:addressId(\\d+)', procedureApi({
  query: 'CALL userAddressInsertOrUpdate(?, ?, ?)',
  paramsHandler: ({
    userId, addressId, is_default: isDefault,
  }) => [userId, addressId, isDefault ? 1 : 0],
}));


// ASSIGNMENT //////////////////////////////////////////
// get assigned reservations
router.get('/:id/reservations');

export default router;

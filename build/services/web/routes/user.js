"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressMysqlHelpers = require("express-mysql-helpers");

const router = (0, _expressMysqlHelpers.getDomainRouter)({
  viewTable: 'user',
  createProcedure: {
    query: 'CALL userInsert(@new_id, ?, ?, ?, ?, ?, ?)',
    paramsHandler: ({
      firstname,
      lastname,
      date_of_birth: dateOfBirth,
      gender,
      email,
      contact_number: contactNumber
    }) => [firstname, lastname, dateOfBirth, gender, email, contactNumber]
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
      contact_number: contactNumber
    }) => [id, firstname, lastname, dateOfBirth, gender, email, contactNumber]
  },
  deleteProcedure: {
    query: 'CALL isActiveUpdate(?, ?, ?)',
    paramsHandler: ({
      id
    }) => ['user', id, 0]
  }
}); // ACCESS LEVEL ////////////////////////////////////
// userAccessLevelUpdate

router.patch('/:id(\\d+)', (0, _expressMysqlHelpers.procedureApi)({
  query: 'CALL userAccessLevelUpdate(?, ?, ?, ?); SELECT * FROM user_access_level WHERE user_id = ?',
  paramsHandler: ({
    id,
    is_basic: isBasic,
    is_provider: isProvider,
    is_admin: isAdmin
  }) => [id, isBasic === 'true' ? 1 : 0, isProvider === 'true' ? 1 : 0, isAdmin === 'true' ? 1 : 0, id],
  resultHandler: result => result[1]
})); //  ADDRESS  /////////////////////////////////////
// GET MANY

router.get('/:id(\\d+)/address', (0, _expressMysqlHelpers.procedureApi)({
  query: `SELECT address.* FROM address 
  INNER JOIN user_address ON address.id = user_address.address_id 
  WHERE user_address.user_id = ?`,
  paramsHandler: ({
    id
  }) => [id]
})); // GET BY ADDRESS ID

router.get('/:userId(\\d+)/address/:addressId(\\d+)', (0, _expressMysqlHelpers.getApi)({
  query: ({
    addressId
  }) => `SELECT * FROM address ${(0, _expressMysqlHelpers.getWhere)({
    id: addressId
  })} LIMIT 1`,
  resultHandler: result => result[0]
})); // addressInsert

router.post('/:id(\\d+)/address', (0, _expressMysqlHelpers.procedureApi)({
  query: `CALL addressInsert(@new_id, ?, ?, ?, ?, ?, ?, ?); 
  SELECT * FROM address where id = LAST_INSERT_ID(); 
  CALL userAddressInsertOrUpdate(?, LAST_INSERT_ID(), ?);`,
  paramsHandler: ({
    id,
    province,
    city,
    barangay,
    room_number: roomNumber,
    bldg_number: bldgNumber,
    zip,
    landmark,
    is_default: isDefault
  }) => [province, city, barangay, roomNumber, bldgNumber, zip, landmark, id, isDefault ? 1 : 0],
  resultHandler: result => result[1],
  responseCode: 201
})); // addressUpdate

router.put('/:userId(\\d+)/address/:addressId(\\d+)', (0, _expressMysqlHelpers.procedureApi)({
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
    landmark
  }) => [userId, addressId, province, city, barangay, roomNumber, bldgNumber, zip, landmark, addressId],
  resultHandler: result => result[1]
})); // userAddressDelete

router.delete('/:userId(\\d+)/address/:addressId(\\d+)', (0, _expressMysqlHelpers.procedureApi)({
  query: 'CALL userAddressDelete(?, ?)',
  paramsHandler: ({
    userId,
    addressId
  }) => [userId, addressId]
})); // userAddressInsertOrUpdate

router.patch('/:userId(\\d+)/address/:addressId(\\d+)', (0, _expressMysqlHelpers.procedureApi)({
  query: 'CALL userAddressInsertOrUpdate(?, ?, ?)',
  paramsHandler: ({
    userId,
    addressId,
    is_default: isDefault
  }) => [userId, addressId, isDefault === 'true' ? 1 : 0]
})); // ASSIGNMENT //////////////////////////////////////////
// get assigned reservations

router.get('/:id/reservation', (0, _expressMysqlHelpers.procedureApi)({
  query: `SELECT reservation.* FROM reservations 
  INNER JOIN user_provider_assignment 
  ON reservation.id = user_provider_assignment.reservation_id 
  WHERE user_provider_assignment.user_provider_id = ?`,
  paramsHandler: ({
    id
  }) => [id]
}));
var _default = router;
exports.default = _default;
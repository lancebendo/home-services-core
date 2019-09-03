"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressMysqlHelpers = require("express-mysql-helpers");

// import { getWhere } from '../helpers';
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
  }
}); // ACCESS LEVEL ////////////////////////////////////

router.patch('/:id(\\id+)', (req, res, next) => {
  next();
}); //  ADDRESS  /////////////////////////////////////
// GET /user/{id}/address/{filter or no filter}

router.get('/:id(\\d+)/address'); // GET /user/{id}/address/{id} (get user's address by id. doable to ADMIN or the user itself.)

router.get('/:userId(\\d+)/address/:addressId(\\d+)', (req, res, next) => {
  next();
}); // POST /user/{id}/address (create new user address. doable to ADMIN or the user itself.)

router.post('/:id(\\d+)/address', (req, res, next) => {
  const {
    id
  } = req.params;
  const {
    province,
    city,
    barangay,
    room_number: roomNumber,
    bldg_number: bldgNumber,
    zip,
    landmark,
    is_default: isDefault
  } = req.body;
  (0, _expressMysqlHelpers.connectWrapper)({
    isReadOnlyConnection: false,
    isTransaction: true,
    multipleStatements: true
  }).then((0, _expressMysqlHelpers.queryWrapper)({
    queryString: 'CALL addressInsert(@new_id, ?, ?, ?, ?, ?, ?, ?)',
    params: [province, city, barangay, roomNumber, bldgNumber, zip, landmark]
  })).then((0, _expressMysqlHelpers.queryWrapper)({
    queryString: `SELECT * FROM address WHERE id = LAST_INSERT_ID() LIMIT 1; 
      CALL userAddressInsertOrUpdate(?, LAST_INSERT_ID(), ?)`,
    params: [id, isDefault && isDefault !== 'false' ? 1 : 0],
    isFinalQuery: true
  })).then(({
    result
  }) => res.status(201).json({
    status: 'success',
    data: result
  })).catch(next);
}); // PUT /user/{id}/address/{id} (update user address. doable to ADMIN or the user itself.)

router.put('/:userId(\\d+)/address/:addressId(\\d+)', (req, res, next) => {
  const {
    userId,
    addressId
  } = req.params;
  const {
    province,
    city,
    barangay,
    room_number: roomNumber,
    bldg_number: bldgNumber,
    zip,
    landmark,
    is_default: isDefault
  } = req.body;
  (0, _expressMysqlHelpers.connectWrapper)({
    isReadOnlyConnection: false,
    isTransaction: true,
    multipleStatements: true
  }).then((0, _expressMysqlHelpers.queryWrapper)({
    queryString: 'CALL addressUpdate(?, ?, ?, ?, ?, ?, ?, ?)',
    params: [addressId, province, city, barangay, roomNumber, bldgNumber, zip, landmark]
  })).then((0, _expressMysqlHelpers.queryWrapper)({
    queryString: 'SELECT * FROM address where id = ? LIMIT 1; CALL userAddressInsertOrUpdate(?, ?, ?)',
    params: [addressId, userId, addressId, isDefault && isDefault !== 'false' ? 1 : 0],
    isFinalQuery: true
  })).then(({
    result
  }) => res.status(201).json({
    status: 'success',
    data: result
  })).catch(next);
}); // PATCH /user/{id}/address/{id}

router.patch('/:userId(\\d+)/address/:addressId(\\d+)', (req, res, next) => {
  next();
}); // DELETE /user/{id}/address/{id} (disable user address. doable to ADMIN or the user itself.)

router.delete('/:userId(\\d+)/address/:addressId(\\d+)', (req, res, next) => {
  next();
}); // RESERVATIONS /////////////////////////////////////////////

/* GET /user/{id}/reservation/{filter} (get reservations of a user.
                                doable to ADMIN or the user itself.) */

router.get('/:id(\\d+)/reservation', (req, res, next) => {
  next();
});
/* GET /user/{id}/reservation/{id} (get a reservation of a
                    user by it's id. doable to ADMIN or the user itself.) */

router.get('/:userId(\\d+)/reservation/:reservationId(\\d+)', (req, res, next) => {
  next();
}); // COMPLETED SESSION ////////////////////////////////////////

router.get('/:id(\\d+)/completed', (req, res, next) => {
  next();
});
router.get('/:userId(\\d+)/completed/:completedId(\\d+)', (req, res, next) => {
  next();
});
var _default = router;
exports.default = _default;
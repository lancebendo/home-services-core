import { getDomainRouter } from 'express-mysql-helpers';
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
// userAccessLevelUpdate hindi dapat patch to


//  ADDRESS  /////////////////////////////////////
// userAddressInsertOrUpdate
// userAddressDelete
// addressInsert
// addressUpdate


// RESERVATIONS /////////////////////////////////////////////

/* GET /user/{id}/reservation/{filter} (get reservations of a user.
                                doable to ADMIN or the user itself.) */
router.get('/:id(\\d+)/reservation', (req, res, next) => {
  next();
});

/* GET /user/{id}/reservation/{id} (get a reservation of a
                    user by it's id. doable to ADMIN or the user itself.) */
router.get('/:userId(\\d+)/reservation/:reservationId(\\d+)', (req, res, next) => {
  next();
});


// COMPLETED SESSION ////////////////////////////////////////

router.get('/:id(\\d+)/completed', (req, res, next) => {
  next();
});

router.get('/:userId(\\d+)/completed/:completedId(\\d+)', (req, res, next) => {
  next();
});


// ASSIGNMENT //////////////////////////////////////////

export default router;

import express from 'express';

import { dbConnect } from '../mysql';
import { getWhere } from '../helpers';

const router = express.Router();

// GET /user?{filter} (get users by filter. ADMIN ONLY)
/* {FILTERS ON GET}
  CREATED_DATE = gte or lte
  FIRSTNAME = like or wildcard
  LASTNAME = like or wildcard
  EMAIL = like or wildcard
  IS_ACTIVE = true or false */
router.get('/', (req, res, next) => {
  const response = {
    status: 'failed',
    data: [],
  };

  const queryString = `SELECT * FROM ADDON 
                    ${getWhere(req.query)} 
                    ORDER BY CREATED_DATE DESC`;

  try {
    dbConnect((connection) => {
      connection.query(queryString, (err, results) => {
        if (err) throw err;
        response.data = results;
      });
    }, true, true);
  } catch (err) {
    next(err);
  }

  res.status(200).json(response);
});

// GET /user/{id} (get user by id. doable to ADMIN or the user itself.)
router.get('/:id', (req, res, next) => {
  next();
});

// POST /user (create new user. doable to ADMIN or un-authenticated user.)
router.post('/', (req, res, next) => {
  next();
});

// PUT /user/{id} (update user. doable to ADMIN or the user itself.)
router.put('/:id', (req, res, next) => {
  next();
});

// DELETE /user/{id} (disable user. ADMIN ONLY)
router.delete('/:id', (req, res, next) => {
  next();
});


//  ADDRESS  /////////////////////////////////////

// GET /user/{id}/address/{filter or no filter}
/* {FILTERS ON GET}
  CREATED_DATE = gte or lte
  PROVINCE = like or wildcard
  CITY = like or wildcard
  BARANGAY = like or wildcard
  ROOM NUMBER = like or wildcard
  BLDG NUMBER = like or wildcard
  ZIP = like or wildcard
  LANDMARK = like or wildcard
  IS_ACTIVE = true or false */
router.get('/:id/address', (req, res, next) => {
  next();
});

// GET /user/{id}/address/{id} (get user's address by id. doable to ADMIN or the user itself.)
router.get('/:id/address/:id', (req, res, next) => {
  next();
});

// POST /user/{id}/address (create new user address. doable to ADMIN or the user itself.)
router.post('/:id/address/', (req, res, next) => {
  next();
});

// PUT /user/{id}/address/{id} (update user address. doable to ADMIN or the user itself.)
router.put('/:id/address/:addressId/', (req, res, next) => {
  next();
});

// PATCH /user/{id}/address/{id}
router.patch('/:id/address/:addressId/', (req, res, next) => {
  next();
});

// DELETE /user/{id}/address/{id} (disable user address. doable to ADMIN or the user itself.)
router.delete('/:id/address/:addressId/', (req, res, next) => {
  next();
});


// RESERVATIONS /////////////////////////////////////////////

/* GET /user/{id}/reservation/{filter} (get reservations of a user.
                                doable to ADMIN or the user itself.) */
router.get('/:id/reservation', (req, res, next) => {
  next();
});

/* GET /user/{id}/reservation/{id} (get a reservation of a
                    user by it's id. doable to ADMIN or the user itself.) */
router.get('/:id/reservation/:reservationId', (req, res, next) => {
  next();
});


// COMPLETED SESSION ////////////////////////////////////////

router.get('/:id/completed', (req, res, next) => {
  next();
});

router.get('/:id/completed/:completedId', (req, res, next) => {
  next();
});


export default router;

import { createCrudApi } from './shared';

const router = createCrudApi({
  table: 'user',
  createProcedure: 'CALL userInsert(@new_id, ?, ?, ?, ?, ?, ?)',
  updateProcedure: 'CALL userUpdate(?, ?, ?, ?, ?, ?, ?)',
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
router.get('/:id(\\d+)/address', (req, res, next) => {
  next();
});

// GET /user/{id}/address/{id} (get user's address by id. doable to ADMIN or the user itself.)
router.get('/:userId(\\d+)/address/:addressId(\\d+)', (req, res, next) => {
  next();
});

// POST /user/{id}/address (create new user address. doable to ADMIN or the user itself.)
router.post('/:id(\\d+)/address', (req, res, next) => {
  next();
});

// PUT /user/{id}/address/{id} (update user address. doable to ADMIN or the user itself.)
router.put('/:userId(\\d+)/address/:addressId(\\d+)', (req, res, next) => {
  next();
});

// PATCH /user/{id}/address/{id}
router.patch('/:userId(\\d+)/address/:addressId(\\d+)', (req, res, next) => {
  next();
});

// DELETE /user/{id}/address/{id} (disable user address. doable to ADMIN or the user itself.)
router.delete('/:userId(\\d+)/address/:addressId(\\d+)', (req, res, next) => {
  next();
});


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


export default router;

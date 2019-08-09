"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// validate
// process args
// execute
var router = _express["default"].Router(); // GET /user?{filter} (get users by filter. ADMIN ONLY)

/* {FILTERS ON GET}
  CREATED_DATE = gte or lte
  FIRSTNAME = like or wildcard
  LASTNAME = like or wildcard
  EMAIL = like or wildcard
  IS_ACTIVE = true or false */


router.get('/', function (req, res, next) {
  next();
}); // GET /user/{id} (get user by id. doable to ADMIN or the user itself.)

router.get('/:id', function (req, res, next) {
  next();
}); // POST /user (create new user. doable to ADMIN or un-authenticated user.)

router.post('/', function (req, res, next) {
  next();
}); // PUT /user/{id} (update user. doable to ADMIN or the user itself.)

router.put('/:id', function (req, res, next) {
  next();
}); // DELETE /user/{id} (disable user. ADMIN ONLY)

router["delete"]('/:id', function (req, res, next) {
  next();
}); //  ADDRESS  /////////////////////////////////////
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

router.get('/:id/address', function (req, res, next) {
  next();
}); // GET /user/{id}/address/{id} (get user's address by id. doable to ADMIN or the user itself.)

router.get('/:id/address/:id', function (req, res, next) {
  next();
}); // POST /user/{id}/address (create new user address. doable to ADMIN or the user itself.)

router.post('/:id/address/', function (req, res, next) {
  next();
}); // PUT /user/{id}/address/{id} (update user address. doable to ADMIN or the user itself.)

router.put('/:id/address/:addressId/', function (req, res, next) {
  next();
}); // PATCH /user/{id}/address/{id}

router.patch('/:id/address/:addressId/', function (req, res, next) {
  next();
}); // DELETE /user/{id}/address/{id} (disable user address. doable to ADMIN or the user itself.)

router["delete"]('/:id/address/:addressId/', function (req, res, next) {
  next();
}); // RESERVATIONS /////////////////////////////////////////////

/* GET /user/{id}/reservation/{filter} (get reservations of a user.
                                doable to ADMIN or the user itself.) */

router.get('/:id/reservation', function (req, res, next) {
  next();
});
/* GET /user/{id}/reservation/{id} (get a reservation of a
                    user by it's id. doable to ADMIN or the user itself.) */

router.get('/:id/reservation/:reservationId', function (req, res, next) {
  next();
}); // COMPLETED SESSION ////////////////////////////////////////

router.get('/:id/completed', function (req, res, next) {
  next();
});
router.get('/:id/completed/:completedId', function (req, res, next) {
  next();
});
var _default = router;
exports["default"] = _default;
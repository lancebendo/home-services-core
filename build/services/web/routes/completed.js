"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { getByMultipleApi, getByIdApi, deleteApi } from './shared';
const router = _express.default.Router(); // GET /completed?{filter} (get reservations by filter. ADMIN ONLY.)
// router.get('/', getByMultipleApi('completed_session'));
// GET /completed/{id} (get reservation by id. ADMIN ONLY.)
// router.get('/:id(\\d+)', getByIdApi('completed_session'));
// DELETE /completed/{id} (disable completed session. ADMIN ONLY)
// router.delete('/:id(\\d+)', deleteApi('completed_session'));


var _default = router;
exports.default = _default;
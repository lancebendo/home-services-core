"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shared = require("./shared");

const router = (0, _shared.createCrudApi)({
  table: 'promo',
  createProcedure: 'CALL promoInsert(@new_id, ?, ?)',
  updateProcedure: 'CALL promoUpdate(?, ?, ?)'
}); // may patch pa to. apply or remove to a user or service

var _default = router;
exports.default = _default;
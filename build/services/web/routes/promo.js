"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _expressMysqlHelpers = require("express-mysql-helpers");

const router = (0, _expressMysqlHelpers.getDomainRouter)({
  viewTable: 'promo',
  createProcedure: {
    query: 'CALL promoInsert(@new_id, ?, ?)'
  },
  updateProcedure: {
    query: 'CALL promoUpdate(?, ?, ?)'
  }
}); // may patch pa to. apply or remove to a user or service

var _default = router;
exports.default = _default;
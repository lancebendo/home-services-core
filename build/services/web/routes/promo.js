"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createCrudApi = _interopRequireDefault(require("./shared/createCrudApi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _createCrudApi.default)({
  table: 'promo',
  createProcedure: 'promoInsert(@new_id, ?, ?)',
  getCreateFields: ({
    name,
    description
  }) => [name, description],
  updateProcedure: 'promoUpdate(?, ?, ?)',
  getUpdateFields: ({
    id,
    name,
    description
  }) => [id, name, description]
});
var _default = router;
exports.default = _default;
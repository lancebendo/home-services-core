"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _boom = _interopRequireDefault(require("boom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
const ensurePermission = userType => (req, res, next) => {
  if (req.user && userType && userType instanceof Array) {
    userType.forEach(value => {
      if (value === req.user.userType) next();
    });
  } else if (req.user && userType && userType === req.user.userType) next();else if (req.user && req.method === 'GET') next(); // means readonly
  else if (req.user && req.params.userId && req.params.userId === req.user.id) next();else next(_boom.default.unauthorized('You\'re not allowed to access this API.'));
};

var _default = ensurePermission;
exports.default = _default;
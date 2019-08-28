"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "completed", {
  enumerable: true,
  get: function () {
    return _completed.default;
  }
});
Object.defineProperty(exports, "promo", {
  enumerable: true,
  get: function () {
    return _promo.default;
  }
});
Object.defineProperty(exports, "reservation", {
  enumerable: true,
  get: function () {
    return _reservation.default;
  }
});
Object.defineProperty(exports, "service", {
  enumerable: true,
  get: function () {
    return _service.default;
  }
});
Object.defineProperty(exports, "user", {
  enumerable: true,
  get: function () {
    return _user.default;
  }
});
exports.default = void 0;

var _completed = _interopRequireDefault(require("./completed"));

var _promo = _interopRequireDefault(require("./promo"));

var _reservation = _interopRequireDefault(require("./reservation"));

var _service = _interopRequireDefault(require("./service"));

var _user = _interopRequireDefault(require("./user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [{
  controller: _completed.default,
  baseUrl: '/completed'
}, {
  controller: _promo.default,
  baseUrl: '/promo'
}, {
  controller: _reservation.default,
  baseUrl: '/reservation'
}, {
  controller: _service.default,
  baseUrl: '/service'
}, {
  controller: _user.default,
  baseUrl: '/user'
}];
exports.default = _default;
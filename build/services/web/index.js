"use strict";

var _express = _interopRequireDefault(require("express"));

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// setup dependencies
// routes
// setup database
// setup cors
// setup passport
// setup api key
// setup app
var app = (0, _express["default"])();
var PORT = process.env.PORT || 3000; // routes setup

app.route('/addon', _routes.addon); // graceful shutdown function
// start app

app.listen(PORT, function () {
  return console.log("Listening to PORT #: ".concat(PORT, "."));
});
"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// setup dependencies
// setup app
var app = (0, _express["default"])();
var PORT = process.env.PORT || 3000; // setup database
// setup cors
// setup passport
// setup api key
// routes
// graceful shutdown function
// start app

app.listen(PORT, function () {
  return console.log("Listening to PORT #: ".concat(PORT, "."));
});
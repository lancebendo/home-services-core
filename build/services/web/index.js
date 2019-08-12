"use strict";

var _express = _interopRequireDefault(require("express"));

var _errorHandler = _interopRequireDefault(require("./middlewares/errorHandler"));

var _urlNotFoundHandler = _interopRequireDefault(require("./middlewares/urlNotFoundHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setup dependencies
// routes
// setup database
// setup cors
// setup passport
// setup api key
// setup app
const app = (0, _express.default)();
const PORT = process.env.PORT || 3000;
app.use((0, _urlNotFoundHandler.default)());
app.use((0, _errorHandler.default)()); // graceful shutdown function
// start app

app.listen(PORT, () => console.log(`Listening to PORT #: ${PORT}.`));
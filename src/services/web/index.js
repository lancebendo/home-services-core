// setup dependencies
import express from 'express';

// routes

import errorHandler from './middlewares/errorHandler';
import urlNotFoundHandler from './middlewares/urlNotFoundHandler';
// setup database


// setup cors


// setup passport


// setup api key


// setup app
const app = express();
const PORT = process.env.PORT || 3000;


app.use(urlNotFoundHandler());
app.use(errorHandler());

// graceful shutdown function


// start app
app.listen(PORT, () => console.log(`Listening to PORT #: ${PORT}.`));

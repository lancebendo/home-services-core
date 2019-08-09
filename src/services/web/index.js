// setup dependencies
import express from 'express';

// routes
import { addon } from './routes';

// setup database


// setup cors


// setup passport


// setup api key


// setup app
const app = express();
const PORT = process.env.PORT || 3000;

// routes setup
app.route('/addon', addon);

// graceful shutdown function


// start app
app.listen(PORT, () => console.log(`Listening to PORT #: ${PORT}.`));

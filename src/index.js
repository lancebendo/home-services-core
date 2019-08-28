// import config from './config';
// import mysql from './services/web/mysql';
// // const obj = new ConnectionString(process.env.MYSQL_URL, { user: 'root' });
// // console.log(obj);
// console.log(config.MYSQL);
// mysql.connect((err) => {
//   if (err) {
//     console.error(`error connecting: ${err.stack}`);
//     return;
//   }

//   console.log(`connected as id ${mysql.threadId}`);
// });

// mysql.query('SELECT * FROM addon', (error, results) => {
//   if (error) throw error;
//   // connected!
//   console.log(results);
// });

// mysql.end((err) => {
//   if (err) throw err;

//   console.log('connection ended');
// });


// // const combineWhere = (where1, where2, separator) => `${where1} ${separator}
// // ${where2.replace('WHERE', '')}`;

// // const getWhere = (queryObject) => {
// //   const conditions = Object.keys(queryObject);
// //   if (conditions.length < 1) return '';

// //   let output = ' WHERE (';
// //   let isFirst = true;

// //   conditions.forEach((condition) => {
// //     if (isFirst) {
// //       isFirst = false;
// //     } else {
// //       output = output.concat(' AND ');
// //     }

// //     if (typeof queryObject[condition] === 'string') {
// //       const value = `${typeof queryObject[condition]
// //       === 'string' ? `'${queryObject[condition]}'`
// //       : `${queryObject[condition]}`}`;
// //       output = output.concat(` ${condition} = ${value}`);
// //     } else {
// //       const subCondition = Object.keys(queryObject[condition])[0];

// //       switch (subCondition) {
// //         case 'gt':
// //           output = output.concat(` ${condition} > ${queryObject[condition][subCondition]} `);
// //           break;

// //         case 'gte':
// //           output = output.concat(` ${condition} >= ${queryObject[condition][subCondition]} `);
// //           break;

// //         case 'lt':
// //           output = output.concat(` ${condition} < ${queryObject[condition][subCondition]} `);
// //           break;

// //         case 'lte':
// //           output = output.concat(` ${condition} <= ${queryObject[condition][subCondition]} `);
// //           break;

// //         case 'lk':
// //           output = output.concat(` ${condition} LIKE
// //           '${queryObject[condition][subCondition]}' `);
// //           break;

// //         default:
// //           throw new Error('Invalid condition in query.');
// //       }
// //     }
// //   });

// //   output = output.concat(' ) ');

// //   return output;
// // };

// // const s = getWhere({ age: { lte: 3 }, name: { lk: 'haha' }, q: 'sdf' });
// // const y = getWhere({ age: { gt: 5 } });
// // console.log(combineWhere(s, y, 'AND'));

// setup dependencies
import express from 'express';
import bodyParser from 'body-parser';

// routes
import routes from './services/web/routes';
import errorHandler from './services/web/middlewares/errorHandler';
import urlNotFoundHandler from './services/web/middlewares/urlNotFoundHandler';
// setup database


// setup cors


// setup passport


// setup api key


// setup app
const app = express();
const PORT = process.env.PORT || 3000;


// not sure kung false dapat yung extended.
app.use(bodyParser.urlencoded({ extended: false }));


// routes setup
routes.forEach((route) => {
  console.log(`Loading Route: ${route.baseUrl}`);
  app.use(route.baseUrl, route.controller);
});


app.use(urlNotFoundHandler());
app.use(errorHandler());


// graceful shutdown function


// start app
app.listen(PORT, () => console.log(`Listening to PORT #: ${PORT}.`));

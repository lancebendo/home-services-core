import { Promise } from 'bluebird';


const queryWrapper = (
  connection,
  queryString,
  params = [],
) => new Promise((resolve, reject) => {
  connection.query(queryString, params, (err, result) => {
    if (err) reject({ connection, error: err });
    else resolve({ connection, result });
  });
});

// const queryWrapper = (
//   queryString,
//   callback,
// ) => (
//   connection,
//   errHandler,
//   { isAutoEnd, isTransaction },
//   endConnection,
// ) => {
//   connection.query(queryString, (err, results) => {
//     if (err) {
//       if (isTransaction) connection.rollback();
//       errHandler(err);
//     } else {
//       const nextQuery = callback(results);
//       if (nextQuery) nextQuery(connection, errHandler, { isTransaction, isAutoEnd }, endConnection);
//       else endConnection(connection);
//     }
//   });
// };

export default queryWrapper;

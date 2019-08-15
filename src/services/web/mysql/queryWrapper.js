import { Promise } from 'bluebird';


export const queryWrapper2 = (connection, queryString) => new Promise((resolve, reject) => {
  connection.query(queryString, (err, result) => {
    if (err) reject(err, connection);
    else {
      resolve(connection, result);
    }
  });
});

const queryWrapper = (
  queryString,
  callback,
) => (
  connection,
  errHandler,
  { isAutoEnd, isTransaction },
  endConnection,
) => {
  connection.query(queryString, (err, results) => {
    if (err) {
      if (isTransaction) connection.rollback();
      errHandler(err);
    } else {
      const nextQuery = callback(results);
      if (nextQuery) nextQuery(connection, errHandler, { isTransaction, isAutoEnd }, endConnection);
      else endConnection(connection);
    }
  });
};

export default queryWrapper;

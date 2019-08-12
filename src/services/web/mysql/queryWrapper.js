const queryWrapper = (queryString, callback) => (connection, errHandler, isTransaction) => {
  connection.query(queryString, (err, results) => {
    if (err) {
      if (isTransaction) connection.rollback();
      errHandler(err);
    } else {
      const nextQuery = callback(results);
      if (nextQuery) nextQuery(connection, errHandler, isTransaction);
    }
  });
};

export default queryWrapper;

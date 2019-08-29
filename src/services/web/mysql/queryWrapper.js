import { Promise } from 'bluebird';

const queryWrapper = ({
  queryString,
  params = [],
  isFinalQuery = false,
  resultHandler = result => result,
}) => ({
  connection, result: lastResult = {}, successHandler, errorHandler,
}) => new Promise((resolve, reject) => {
  connection.query(queryString, params, (error, queryResult) => {
    if (error) {
      errorHandler();
      reject(error);
    } else {
      if (isFinalQuery) successHandler();
      const finalResult = resultHandler(queryResult);
      resolve({
        connection, result: { ...lastResult, ...finalResult }, successHandler, errorHandler,
      });
    }
  });
});

export default queryWrapper;

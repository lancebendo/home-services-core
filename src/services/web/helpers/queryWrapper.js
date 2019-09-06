import { Promise } from 'bluebird';

const queryWrapper = ({
  queryString,
  params = [],
  isFinalQuery = true,
  resultHandler = result => result,
}) => ({
  connection, result: lastResult, successHandler, errorHandler,
}) => new Promise((resolve, reject) => {
  connection.query(queryString, params, (error, queryResult) => {
    if (error) {
      errorHandler();
      reject(error);
    } else {
      if (isFinalQuery) successHandler();
      const finalResult = { ...lastResult, ...resultHandler(queryResult) };

      resolve({
        connection,
        result: Object.keys(finalResult).length > 0 ? finalResult : { message: 'No data' },
        successHandler,
        errorHandler,
      });
    }
  });
});

export default queryWrapper;

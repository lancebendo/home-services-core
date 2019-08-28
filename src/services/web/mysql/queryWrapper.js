import { Promise } from 'bluebird';

const queryWrapper = ({
  queryString,
  params = [],
  isFinalQuery = false,
}) => ({ connection, resultHandler, errorHandler }) => new Promise((resolve, reject) => {
  connection.query(queryString, params, (error, result) => {
    if (error) {
      errorHandler();
      reject(error);
    } else {
      if (isFinalQuery) resultHandler();
      resolve({
        connection, result, resultHandler, errorHandler,
      });
    }
  });
});

export default queryWrapper;

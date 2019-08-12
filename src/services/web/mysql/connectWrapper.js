import mysql from 'mysql';
import boom from 'boom';

/*

  accept a logic function to be executed in the middle.

  accept an error handler function in case of error.

  accept configuration if isreadonly, isautoend, etc.

*/

const connectWrapper = (
  errHandler,
  query,
  {
    isReadOnlyConnection = true,
    isAutoEnd = true,
    isTransaction = false,
    multipleStatements = false,
  } = {},
) => {
  // create connection via env
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    user: isReadOnlyConnection ? process.env.MYSQL_READONLY || 'readonly_hs_user' : process.env.MYSQL_WRITER || 'writer_hs_user',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DATABASE || 'home_services',
    multipleStatements,
  });

  // error handlers
  const connectionError = err => errHandler(boom.badGateway('Cannot cannot to the Database', err));
  const queryError = err => errHandler(boom.internal('Database Query Error', err));
  const defaultError = err => errHandler(boom.badRequest('Error on database request', err));

  // bind error handler
  connection.on('error', (err) => {
    if (isTransaction) connection.rollback();
    defaultError(err);
  });

  connection.connect((err) => {
    if (err) {
      if (isTransaction) connection.rollback();
      connectionError(err);
    }
  });

  query(connection, queryError, isTransaction);

  if (isAutoEnd) {
    if (isTransaction) {
      connection.commit(null, (err) => {
        if (err) connection.rollback();

        connection.end((_err) => {
          if (_err) {
            console.log(_err);
            console.log('Unable to close the connection to the database');
          }
        });
      });
    } else {
      connection.end((err) => {
        if (err) {
          console.log(err);
          console.log('Unable to close the connection to the database');
        }
      });
    }
  }

  return connection;
};

export default connectWrapper;

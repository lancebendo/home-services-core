/* eslint-disable no-console */
import mysql from 'mysql';
import { Promise } from 'bluebird';

import { defaultConnectionConfig } from './constants';

const connectWrapper = ({
  connectionConfig = defaultConnectionConfig,
  isReadOnlyConnection = true,
  isTransaction = false,
  multipleStatements = false,
}) => {
  // create connection via env
  const connection = mysql.createConnection({
    // host: host || process.env.MYSQL_HOST || 'localhost',
    // user: user || isReadOnlyConnection ? process.env.MYSQL_READONLY || 'readonly_hs_user'
    // : process.env.MYSQL_WRITER || 'writer_hs_user',
    // password: password || process.env.MYSQL_PASSWORD || 'password',
    // database: database || process.env.MYSQL_DATABASE || 'home_services',
    ...connectionConfig,
    user: isReadOnlyConnection
      ? process.env.MYSQL_READONLY || connectionConfig.readOnlyUser
      : process.env.MYSQL_WRITER || connectionConfig.writerUser,
    multipleStatements,
  });

  return new Promise((resolve, reject) => {
    // bind error handler
    connection.on('error', (error) => {
      if (isTransaction) {
        console.log('Rolling back');
        connection.rollback((_error) => {
          if (_error) reject(_error);
          reject(error);
        });
      }
      reject(error);
    });

    const errorHandler = () => {
      if (isTransaction) {
        console.log('Rolling back');
        connection.rollback((__error) => {
          if (__error) reject(__error);
          else connection.end();
        });
      } else connection.end();
    };

    const successHandler = () => {
      if (isTransaction) {
        console.log('Committing');
        connection.commit((_error) => {
          if (_error) {
            console.log('Rolling back');
            connection.rollback((__error) => {
              if (__error) reject(__error);
              else connection.end();
            });
            reject(_error);
          } else connection.end();
        });
      } else connection.end();
    };

    connection.connect((error) => {
      if (error) reject(error);
      else if (isTransaction) {
        connection.beginTransaction((_error) => {
          if (_error) reject(_error);
          resolve({ connection, successHandler, errorHandler });
        });
      } else resolve({ connection, successHandler, errorHandler });
    });
  });
};

export default connectWrapper;

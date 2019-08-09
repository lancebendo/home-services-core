import mysql from 'mysql';

const getConnection = (isReadOnly = true) => mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: isReadOnly ? process.env.MYSQL_READONLY || 'readonly_hs_user' : process.env.MYSQL_WRITER || 'writer_hs_user',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'home_services',
});

export default getConnection;

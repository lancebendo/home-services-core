import mysql from 'mysql';

const getConnection = () => mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USERNAME || 'home_services_app',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'home_services',
});

export default getConnection;

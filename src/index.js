import config from './config';
import mysql from './services/web/mysql';
// const obj = new ConnectionString(process.env.MYSQL_URL, { user: 'root' });
// console.log(obj);
console.log(config.MYSQL);
mysql.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }

  console.log(`connected as id ${mysql.threadId}`);
});

mysql.query('SELECT * FROM user', (error, results) => {
  if (error) throw error;
  // connected!
  console.log(results[0].firstname);
});

mysql.end((err) => {
  if (err) throw err;

  console.log('connection ended');
});

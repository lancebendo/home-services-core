"use strict";

// import config from './config';
// import mysql from './services/web/mysql';
// // const obj = new ConnectionString(process.env.MYSQL_URL, { user: 'root' });
// // console.log(obj);
// console.log(config.MYSQL);
// mysql.connect((err) => {
//   if (err) {
//     console.error(`error connecting: ${err.stack}`);
//     return;
//   }
//   console.log(`connected as id ${mysql.threadId}`);
// });
// mysql.query('SELECT * FROM user', (error, results) => {
//   if (error) throw error;
//   // connected!
//   console.log(results[0].firstname);
// });
// mysql.end((err) => {
//   if (err) throw err;
//   console.log('connection ended');
// });
var combineWhere = function combineWhere(where1, where2, separator) {
  return "".concat(where1, " ").concat(separator, " ").concat(where2.replace('WHERE', ''));
};

var getWhere = function getWhere(queryObject) {
  var conditions = Object.keys(queryObject);
  if (conditions.length < 1) return '';
  var output = ' WHERE (';
  var isFirst = true;
  conditions.forEach(function (condition) {
    if (isFirst) {
      isFirst = false;
    } else {
      output = output.concat(' AND ');
    }

    if (typeof queryObject[condition] === 'string') {
      var value = "".concat(typeof queryObject[condition] === 'string' ? "'".concat(queryObject[condition], "'") : "".concat(queryObject[condition]));
      output = output.concat(" ".concat(condition, " = ").concat(value));
    } else {
      var subCondition = Object.keys(queryObject[condition])[0];

      switch (subCondition) {
        case 'gt':
          output = output.concat(" ".concat(condition, " > ").concat(queryObject[condition][subCondition], " "));
          break;

        case 'gte':
          output = output.concat(" ".concat(condition, " >= ").concat(queryObject[condition][subCondition], " "));
          break;

        case 'lt':
          output = output.concat(" ".concat(condition, " < ").concat(queryObject[condition][subCondition], " "));
          break;

        case 'lte':
          output = output.concat(" ".concat(condition, " <= ").concat(queryObject[condition][subCondition], " "));
          break;

        case 'lk':
          output = output.concat(" ".concat(condition, " LIKE '").concat(queryObject[condition][subCondition], "' "));
          break;

        default:
          throw new Error('Invalid condition in query.');
      }
    }
  });
  output = output.concat(' ) ');
  return output;
};

var s = getWhere({
  age: {
    lte: 3
  },
  name: {
    lk: 'haha'
  },
  q: 'sdf'
});
var y = getWhere({
  age: {
    gt: 5
  }
});
console.log(combineWhere(s, y, 'AND'));
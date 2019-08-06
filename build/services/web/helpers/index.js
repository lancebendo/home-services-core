"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWhere = exports.combineWhere = void 0;

var combineWhere = function combineWhere(where1, where2, separator) {
  return "".concat(where1, " ").concat(separator, " ").concat(where2.replace('WHERE', ''));
};

exports.combineWhere = combineWhere;

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

exports.getWhere = getWhere;
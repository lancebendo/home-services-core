export const combineWhere = (where1, where2, separator) => `${where1} ${separator} ${where2.replace('WHERE', '')}`;

export const getWhere = (queryObject) => {
  const conditions = Object.keys(queryObject);
  if (conditions.length < 1) return '';

  let output = ' WHERE (';
  let isFirst = true;

  conditions.forEach((condition) => {
    if (isFirst) {
      isFirst = false;
    } else {
      output = output.concat(' AND ');
    }

    if (typeof queryObject[condition] !== 'object') {
      const value = `${typeof queryObject[condition] === 'string' ? `'${queryObject[condition]}'` : `${queryObject[condition]}`}`;
      output = output.concat(` ${condition} = ${value}`);
    } else {
      const subCondition = Object.keys(queryObject[condition])[0];

      switch (subCondition) {
        case 'gt':
          output = output.concat(` ${condition} > ${queryObject[condition][subCondition]} `);
          break;

        case 'gte':
          output = output.concat(` ${condition} >= ${queryObject[condition][subCondition]} `);
          break;

        case 'lt':
          output = output.concat(` ${condition} < ${queryObject[condition][subCondition]} `);
          break;

        case 'lte':
          output = output.concat(` ${condition} <= ${queryObject[condition][subCondition]} `);
          break;

        case 'lk':
          output = output.concat(` ${condition} LIKE '${queryObject[condition][subCondition]}' `);
          break;

        default:
          throw new Error('Invalid condition in query.');
      }
    }
  });

  output = output.concat(' ) ');

  return output;
};

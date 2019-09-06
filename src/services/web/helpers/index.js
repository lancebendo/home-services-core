import connectWrapper from './connectWrapper';
import queryWrapper from './queryWrapper';

export { connectWrapper, queryWrapper };

export { default as getDomainRouter } from './getDomainRouter';
export { getApi, procedureApi } from './expressApi';

// dito pa lang, dapat gagawa na ng mysql connection. tapos distribute lang sa mga exports.
// object dapat. connection credentials object.

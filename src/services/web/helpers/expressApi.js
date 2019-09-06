import connectWrapper from './connectWrapper';
import queryWrapper from './queryWrapper';
import { defaultConnectionConfig } from './constants';

export const getApi = ({
  connectionConfig = defaultConnectionConfig,
  query,
  resultHandler = (result) => result,
  isMultipleStatement = true,
}) => (req, res, next) => {
  let finalQuery = '';
  if (typeof query !== 'string') finalQuery = query({ ...req.params, ...req.query });
  else finalQuery = query;

  connectWrapper({
    connectionConfig,
    isReadOnlyConnection: true,
    multipleStatements: isMultipleStatement,
  })
    .then(queryWrapper({ queryString: finalQuery, isFinalQuery: true, resultHandler }))
    .then(({ result }) => res.status(200).json({ status: 'success', data: result || null }))
    .catch(next);
};

export const procedureApi = ({
  connectionConfig = defaultConnectionConfig,
  query,
  paramsHandler = (params) => [...params],
  resultHandler = (result) => result,
  responseCode = 200,
}) => (req, res, next) => {
  let finalQuery = '';
  if (typeof query !== 'string') finalQuery = query({ ...req.params, ...req.query });
  else finalQuery = query;

  connectWrapper({
    connectionConfig,
    isReadOnlyConnection: false,
    isTransaction: true,
    multipleStatements: true,
  })
    .then(queryWrapper({
      queryString: finalQuery,
      params: paramsHandler({ ...req.params, ...req.body }),
      resultHandler,
      isFinalQuery: true,
    }))
    .then(({ result }) => res.status(responseCode).json({ status: 'success', data: result }))
    .catch(next);
};

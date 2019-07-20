
// for handling 404 api endpoint not found

import boom from 'boom';

const urlNotFoundHandler = () => (req, res, next) => {
  next(boom.notFound('API endpoint not found.'));
};

export default urlNotFoundHandler;

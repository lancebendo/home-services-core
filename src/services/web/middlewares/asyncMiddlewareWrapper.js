import boom from 'boom';

// this middleware is a wrapper for async middlewares to handle errors
const asyncMiddlewareWrapper = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch((err) => {
      if (!err.isBoom) next(boom.badImplementation(err));
      else next(err);
    });
};

export default asyncMiddlewareWrapper;

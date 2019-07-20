import boom from 'boom';

const ensureNotAuth = (req, res, next) => {
  if (!req.user) next();
  else next(boom.unauthorized('You need to log-out first.'));
};

export default ensureNotAuth;

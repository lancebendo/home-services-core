/* eslint-disable brace-style */
/* eslint-disable max-len */

import boom from 'boom';

const ensureAuth = (req, res, next) => {
  if (req.user && req.user.isBlocked) next(boom.unauthorized('Your account is blocked. Please contact us regarding to this issue.'));
  else if (req.user) next();
  else next(boom.unauthorized('Login required.'));
};

export default ensureAuth;

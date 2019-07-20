/* eslint-disable max-len */

import boom from 'boom';

const ensurePermission = userType => (req, res, next) => {
  if (req.user && userType && userType instanceof Array) {
    userType.forEach((value) => {
      if (value === req.user.userType) next();
    });
  } else if (req.user && userType && userType === req.user.userType) next();

  else if (req.user && (req.method === 'GET')) next(); // means readonly

  else if (req.user && ((req.params.userId && req.params.userId === req.user.id))) next();

  else next(boom.unauthorized('You\'re not allowed to access this API.'));
};

export default ensurePermission;

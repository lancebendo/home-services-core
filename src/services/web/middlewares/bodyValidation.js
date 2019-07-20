import boom from 'boom';
import joi from 'joi';

const bodyValidation = (schema, body = null) => (req, res, next) => {
  joi.validate(body == null ? req.body : body, schema, (err) => {
    if (err) next(boom.badRequest(`Invalid input! ${err.message}`));
    else next();
  });
};

export default bodyValidation;

import { createError } from '../utils.js';

const validate = (schema, key) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[key]);
    if (error) {
      return next(createError(400, error.message));
    }
    req[key] = value;
    next();
  };
};

const validateBody = (schema) => validate(schema, 'body');
const validateQuery = (schema) => validate(schema, 'query');
const validateParam = (schema) => validate(schema, 'params');

export { validateBody, validateQuery, validateParam };

import { createError } from './utils.js';

const validate = (schema, key) => {
  return async (req, res, next) => {
    try {
      const value = await schema.validateAsync(req[key], {
        abortEarly: false,
      });
      req[key] = value;
      next();
    } catch (err) {
      return next(createError(400, err.message));
    }
  };
};

const validateBody = (schema) => validate(schema, 'body');
const validateQuery = (schema) => validate(schema, 'query');
const validateParam = (schema) => validate(schema, 'params');

export { validateBody, validateQuery, validateParam };

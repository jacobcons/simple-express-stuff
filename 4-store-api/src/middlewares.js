import { createError } from './utils.js';

const validate = (schema, key) => {
  return async (req, res, next) => {
    try {
      const value = await schema.validateAsync(req[key], {
        abortEarly: false,
      });
      Object.defineProperty(req, key, {
        value,
      });
      next();
    } catch (err) {
      return next(createError(400, err.message));
    }
  };
};

const validateBody = (schema) => validate(schema, 'body');
const validateQuery = (schema) => validate(schema, 'query');
const validateParams = (schema) => validate(schema, 'params');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message });
};

const notFound = (req, res, next) => {
  next(createError(404, `Cannot ${req.method} ${req.originalUrl}`));
};

export { validateBody, validateQuery, validateParams, errorHandler, notFound };

import { createError } from './utils.js';
import jwt from 'jsonwebtoken';

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

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(createError(401, 'No token provided'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return next(createError(401, 'Invalid token'));
  }
};

export {
  validateBody,
  validateQuery,
  validateParams,
  errorHandler,
  notFound,
  auth,
};

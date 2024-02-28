import { createError } from '../utils.js';

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return next(createError(400, error.message));
    }
    req.body = value;
    next();
  };
};

export { validateBody };

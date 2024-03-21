import { createError } from '../utils/errors.utils.js';

const errorHandler = (err, req, res, next) => {
  return res
    .status(err.status || 500)
    .json({ message: err.message || 'Something went wrong!' });
};
const notFound = (req, res, next) => {
  next(createError(404, `Cannot ${req.method} ${req.originalUrl}`));
};

export { errorHandler, notFound };

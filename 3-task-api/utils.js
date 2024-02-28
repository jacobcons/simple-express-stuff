import { dirname } from 'path';
import { fileURLToPath } from 'url';

const createError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const __filename = fileURLToPath(import.meta.url);
const rootDir = dirname(__filename);

export { createError, rootDir };

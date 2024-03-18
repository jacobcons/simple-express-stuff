const createError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const checkResourceExists = (resource, id) => {
  if (!resource) {
    throw createError(404, `Resource with id <${id}> not found`);
  }
};

export { createError, checkResourceExists };

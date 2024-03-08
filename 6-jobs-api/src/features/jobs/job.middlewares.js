import { knex, TABLES } from '../../db/db.js';
import { createError } from '../../utils.js';

const verifyJobBelongsToUser = async (req, res, next) => {
  const userId = req.user.id;
  const jobId = req.params.id;

  const jobWithGivenId = await knex(TABLES.JOB)
    .first('userId')
    .where({ id: jobId });
  if (!jobWithGivenId) {
    return next(createError(404, `Job with id ${jobId} doesn't exist`));
  }

  const jobBelongsToUser = jobWithGivenId.userId === userId;
  if (!jobBelongsToUser) {
    return next(createError(403, `Job with id ${jobId} doesn't belong to you`));
  }

  next();
};

export { verifyJobBelongsToUser };

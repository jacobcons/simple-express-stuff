import express from 'express';
import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  updateJob,
  getStats,
} from '../controllers/jobs.controllers.js';
import {
  createJobSchema,
  getJobsSchema,
  updateJobSchema,
} from '../schemas/jobs.schemas.js';
import {
  validateQuery,
  validateBody,
  validateParams,
} from '../middlewares/validation.middlewares.js';
import { singleIdSchema } from '../schemas/id.schemas.js';

const router = express.Router();

router
  .route('/')
  .get(validateQuery(getJobsSchema), getJobs)
  .post(validateBody(createJobSchema), createJob);

router.route('/stats').get(getStats);

router
  .route('/:id')
  .all(validateParams(singleIdSchema))
  .get(getJob)
  .patch(validateBody(updateJobSchema), updateJob)
  .delete(deleteJob);

export default router;

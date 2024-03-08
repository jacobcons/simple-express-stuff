import express from 'express';
import {
  getJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} from './job.controllers.js';
import { verifyToken, validateBody } from '../../middlewares.js';
import { createJobSchema, updateJobSchema } from './job.schemas.js';
import { verifyJobBelongsToUser } from './job.middlewares.js';

const router = express.Router();

router
  .route('/')
  .all(verifyToken)
  .get(getJobs)
  .post(validateBody(createJobSchema), createJob);

router
  .route('/:id(\\d+)')
  .all(verifyToken, verifyJobBelongsToUser)
  .get(getJob)
  .patch(validateBody(updateJobSchema), updateJob)
  .delete(deleteJob);

export default router;

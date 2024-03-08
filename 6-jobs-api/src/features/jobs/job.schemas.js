import Joi from 'joi';
import { POSSIBLE_JOB_STATUSES } from './jobs.constants.js';

const createJobSchema = Joi.object({
  company: Joi.string().required(),
  position: Joi.string().required(),
});

const updateJobSchema = Joi.object({
  company: Joi.string(),
  position: Joi.string(),
  status: Joi.string().valid(...POSSIBLE_JOB_STATUSES),
});

export { createJobSchema, updateJobSchema };

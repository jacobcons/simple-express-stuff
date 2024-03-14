import Joi from 'joi';
import { POSSIBLE_JOB_STATUSES } from '../constants/jobs.constants.js';

export const createJobSchema = Joi.object({
  company: Joi.string().required(),
  position: Joi.string().required(),
});

export const updateJobSchema = Joi.object({
  company: Joi.string(),
  position: Joi.string(),
  status: Joi.string().valid(...POSSIBLE_JOB_STATUSES),
});
export const getJobsSchema = Joi.object({
  searchCompany: Joi.string(),
  searchPosition: Joi.string(),
  status: Joi.string().valid(...POSSIBLE_JOB_STATUSES),
  sort: Joi.string().valid('created_at', '-created_at'),
  page: Joi.number().integer().positive(),
  limit: Joi.number().integer().positive(),
});

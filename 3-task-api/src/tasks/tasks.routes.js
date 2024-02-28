import express from 'express';
import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from './tasks.controllers.js';
import Joi from 'joi';
import { validateBody } from '../middlewares/validation.js';

const router = express.Router();

const baseSchema = Joi.object({
  description: Joi.string().max(20),
  isCompleted: Joi.boolean(),
});

const createSchema = baseSchema.append({
  description: Joi.required(),
});

const updateSchema = baseSchema.or('description', 'isCompleted');

router
  .route('/')
  .get(getTasks)
  .post([validateBody(createSchema), createTask]);

router
  .route('/:id(\\d+)')
  .get(getTask)
  .patch([validateBody(updateSchema), updateTask])
  .delete(deleteTask);

export default router;

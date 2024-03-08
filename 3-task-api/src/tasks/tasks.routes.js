import express from 'express';
import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from './tasks.controllers.js';
import { validateBody } from '../middlewares.js';
import { createTaskSchema, updateTaskSchema } from './tasks.schemas.js';

const router = express.Router();

router
  .route('/')
  .get(getTasks)
  .post([validateBody(createTaskSchema), createTask]);

router
  .route('/:id(\\d+)')
  .get(getTask)
  .patch([validateBody(updateTaskSchema), updateTask])
  .delete(deleteTask);

export default router;

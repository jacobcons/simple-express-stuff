import express from 'express';
import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from './tasks.controllers.js';
import { validateBody } from '../middlewares.js';
import { createSchema, updateSchema } from './tasks.schemas.js';

const router = express.Router();

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

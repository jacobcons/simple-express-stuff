import { knex, TABLES } from '../db/db.js';
import { createError } from '../utils.js';

const getTasks = async (req, res) => {
  const tasks = await knex(TABLES.TASK).select('*');
  res.json(tasks);
};

const createTask = async (req, res, next) => {
  const [task] = await knex(TABLES.TASK).insert(req.body).returning('*');
  res.status(201).json(task);
};

const createTaskNotFoundError = (id) =>
  createError(404, `Task with id ${id} not found`);

const getTask = async (req, res, next) => {
  const { id } = req.params;
  const [task] = await knex(TABLES.TASK).select('*').where({ id });
  if (!task) {
    return next(createTaskNotFoundError(id));
  }
  res.json(task);
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const [task] = await knex(TABLES.TASK)
    .update(req.body)
    .where({ id })
    .returning('*');
  if (!task) {
    return next(createTaskNotFoundError(id));
  }
  res.json(task);
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const rowsDeleted = await knex(TABLES.TASK).delete().where({ id });
  if (rowsDeleted === 0) {
    return next(createTaskNotFoundError(id));
  }
  res.status(204).end();
};

export { getTasks, createTask, getTask, updateTask, deleteTask };

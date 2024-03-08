import { knex, TABLES } from '../../db/db.js';

const getJobs = async (req, res, next) => {
  const userId = req.user.id;
  const jobs = await knex(TABLES.JOB).select('*').where({ userId });
  res.json(jobs);
};

const createJob = async (req, res, next) => {
  const userId = req.user.id;
  const { company, position } = req.body;

  const job = await knex(TABLES.JOB)
    .insert({ userId, company, position })
    .where({ userId })
    .returning('*');
  res.status(201).json(job);
};

const getJob = async (req, res, next) => {
  const { id } = req.params;
  const job = await knex(TABLES.JOB).first('*').where({ id });
  res.json(job);
};

const updateJob = async (req, res, next) => {
  const { id } = req.params;
  const job = await knex(TABLES.JOB)
    .update(req.body)
    .where({ id })
    .returning('*');
  res.json(job);
};

const deleteJob = async (req, res, next) => {
  const { id } = req.params;
  await knex(TABLES.JOB).delete().where({ id });
  res.status(204).end();
};

export { getJobs, createJob, getJob, updateJob, deleteJob };

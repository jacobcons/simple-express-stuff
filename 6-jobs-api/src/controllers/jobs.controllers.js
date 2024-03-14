import { knex } from '../db/connection.js';
import { TABLES } from '../constants/tables.constants.js';
import { checkResourceExists } from '../utils/errors.utils.js';
import { POSSIBLE_JOB_STATUSES } from '../constants/jobs.constants.js';
import { subMonths, format, startOfMonth, addMonths } from 'date-fns';

const getJobs = async (req, res) => {
  const userId = req.user.id;
  const { searchCompany, searchPosition, status, sort } = req.query;

  let query = knex(TABLES.JOB).where({ userId });

  if (searchCompany) {
    query = query.whereILike('company', `%${searchCompany}%`);
  }
  if (searchPosition) {
    query = query.whereILike('position', `%${searchPosition}%`);
  }
  if (status) {
    query = query.where({ status });
  }

  const totalJobs = await query
    .clone()
    .count('* as count')
    .then((res) => parseInt(res[0].count, 10));

  if (sort) {
    const order = sort.startsWith('-') ? 'desc' : 'asc';
    query = query.orderBy('created_at', order);
  }
  query = query.orderBy('id');

  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const offset = (page - 1) * limit;
  query = query.offset(offset).limit(limit);

  const jobs = await query;
  const totalPages = Math.ceil(totalJobs / limit);

  res.json({ data: jobs, totalPages });
};

const createJob = async (req, res) => {
  const userId = req.user.id;
  const { company, position } = req.body;

  const [job] = await knex(TABLES.JOB)
    .insert({ userId, company, position })
    .where({ userId })
    .returning('*');
  res.status(201).json(job);
};

const getJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.id;
  const job = await knex(TABLES.JOB).first('*').where({ id: jobId, userId });
  checkResourceExists(job, jobId);
  res.json(job);
};

const updateJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.id;
  const [job] = await knex(TABLES.JOB)
    .update(req.body)
    .where({ id: jobId, userId })
    .returning('*');
  checkResourceExists(job, jobId);
  res.json(job);
};

const deleteJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.id;
  const deleted = await knex(TABLES.JOB).delete().where({ id: jobId, userId });
  checkResourceExists(deleted, jobId);
  res.status(204).end();
};

const getStats = async (req, res) => {
  const { id } = req.user;

  // for the logged in user, count the number of jobs for each possible status
  const statusCounts = await knex(TABLES.JOB)
    .select('status')
    .count('*')
    .where({ userId: id })
    .groupBy('status');

  const statusCountsObj = {};
  for (const status of POSSIBLE_JOB_STATUSES) {
    statusCountsObj[status] = 0;
  }

  for (const countStatus of statusCounts) {
    const { status, count } = countStatus;
    statusCountsObj[status] = parseInt(count, 10);
  }

  // count the number of job applications monthly over past six months
  const NUMBER_OF_MONTHS_GO_BACK = 6;
  const dateJobsStartFrom = startOfMonth(
    subMonths(new Date(), NUMBER_OF_MONTHS_GO_BACK),
  );
  let monthlyApplications = await knex(TABLES.JOB)
    .select(knex.raw("DATE_TRUNC('month', created_at) as date"))
    .count('*')
    .where({ userId: id })
    .where('created_at', '>=', dateJobsStartFrom)
    .groupBy('date')
    .orderBy('date', 'desc');

  let monthlyApplicationsWithDefaults = [];
  let currentDate = startOfMonth(new Date());
  let indexOfMonthToAdd = 0;
  for (let i = 0; i < NUMBER_OF_MONTHS_GO_BACK; i++) {
    let count = 0;
    if (
      monthlyApplications.length &&
      monthlyApplications[indexOfMonthToAdd].date.getTime() ===
        currentDate.getTime()
    ) {
      count = parseInt(monthlyApplications[indexOfMonthToAdd].count, 10);
      indexOfMonthToAdd++;
    }
    monthlyApplicationsWithDefaults.push({
      date: format(currentDate, 'MMM yyyy'),
      count,
    });
    currentDate = subMonths(currentDate, 1);
  }

  res.json({
    statusCounts: statusCountsObj,
    monthlyApplications: monthlyApplicationsWithDefaults,
  });
};

export { getJobs, createJob, getJob, updateJob, deleteJob, getStats };

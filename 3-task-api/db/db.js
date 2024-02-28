import knexLib from 'knex';
import knexConfig from './knexfile.js';

const knex = knexLib(knexConfig[process.env.NODE_ENV]);

const TABLES = {
  TASK: 'task',
};

export { knex, TABLES };

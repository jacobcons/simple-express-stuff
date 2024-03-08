import knexLib from 'knex';
import knexConfig from '../../knexfile.js';

const knex = knexLib(knexConfig);

const TABLES = {
  USER: 'user',
  JOB: 'job',
};

export { knex, TABLES };

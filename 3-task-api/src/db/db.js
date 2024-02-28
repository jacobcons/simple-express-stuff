import knexLib from 'knex';
import knexConfig from '../../knexfile.js';

const knex = knexLib(knexConfig);

const TABLES = {
  TASK: 'task',
};

export { knex, TABLES };

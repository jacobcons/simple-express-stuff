import knexLib from 'knex';
import knexConfig from '../../knexfile.js';

const knex = knexLib(knexConfig);

const TABLES = {
  PRODUCT: 'product',
};

export { knex, TABLES };

import { knexSnakeCaseMappers } from 'objection';
import { rootDir, loadEnv } from './src/config.js';
import path from 'path';

loadEnv();

export default {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    directory: path.join(rootDir, 'src', 'db', 'migrations'),
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: path.join(rootDir, 'src', 'db', 'seeds'),
  },
  ...knexSnakeCaseMappers(),
};

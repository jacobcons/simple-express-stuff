import { knex } from '../db/db.js';

let trx = null;

beforeAll(async () => {
  await knex.migrate.latest();
});

afterAll(async () => {
  await knex.destroy();
});

beforeEach(async () => {
  trx = await knex.transaction();
});

afterEach(async () => {
  await trx.rollback();
});

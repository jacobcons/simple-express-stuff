import { knex, TABLES } from '../src/db/db.js';
import { app } from '../src/app.js';
import http from 'http';

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(done);
});

afterAll((done) => {
  knex.destroy().then(() => {
    server.close(done);
  });
});

async function clearDatabase() {
  const tableNames = await knex.raw(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public'
    AND table_type='BASE TABLE';
  `);

  for (const table of tableNames.rows) {
    await knex.raw(`DROP TABLE IF EXISTS ${table.table_name} CASCADE`);
  }
}

beforeEach(async () => {
  await clearDatabase();
  await knex.migrate.latest();
  await knex(TABLES.TASK).insert({ description: 'test1' });
});

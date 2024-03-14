import { POSSIBLE_JOB_STATUSES } from '../../constants/jobs.constants.js';
import { TABLES } from '../../constants/tables.constants.js';

function up(knex) {
  return knex.schema
    .createTable(TABLES.JOB, (table) => {
      table.increments('id');
      table.integer('user_id');
      table.string('company').notNullable();
      table.string('position').notNullable();
      table
        .enum('status', POSSIBLE_JOB_STATUSES)
        .notNullable()
        .defaultTo('pending');
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
      table
        .foreign('user_id')
        .references(`${TABLES.USER}.id`)
        .onDelete('CASCADE');
    })
    .then(() => {
      return knex.raw(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
         NEW.updated_at = now();
         RETURN NEW; 
      END;
      $$ language 'plpgsql';
      CREATE TRIGGER update_job_updated_at 
      BEFORE UPDATE ON ${TABLES.JOB} 
      FOR EACH ROW 
      EXECUTE PROCEDURE update_updated_at_column();
    `);
    });
}

function down(knex) {
  return knex
    .raw(
      `
    DROP TRIGGER IF EXISTS update_job_updated_at ON ${TABLES.JOB};
    DROP FUNCTION IF EXISTS update_updated_at_column;
  `,
    )
    .then(() => {
      return knex.raw(`DROP TABLE IF EXISTS ${TABLES.JOB} CASCADE`);
    });
}

export { up, down };

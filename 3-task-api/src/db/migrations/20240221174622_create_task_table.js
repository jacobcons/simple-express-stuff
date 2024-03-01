import knex from 'knex';
import { TABLES } from '../db.js';

function up(knex) {
  return knex.schema.createTable(TABLES.TASK, (table) => {
    table.increments('id');
    table.string('description', 20).notNullable();
    table.boolean('is_completed').notNullable().defaultTo(false);
  });
}

function down(knex) {
  return knex.raw(`DROP TABLE IF EXISTS ${TABLES.TASK} CASCADE`);
}

export { up, down };

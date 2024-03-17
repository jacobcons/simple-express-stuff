import knex from 'knex';

import { TABLES } from '../../constants/tables.constants.js';

function up(knex) {
  return knex.schema.createTable(TABLES.PRODUCT, (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.string('image').notNullable();
  });
}

function down(knex) {
  return knex.raw(`DROP TABLE IF EXISTS "${TABLES.PRODUCT}" CASCADE`);
}

export { up, down };

import knex from 'knex';
import { TABLES } from '../db.js';
import { COMPANY_NAMES } from '../../products/products.constants.js';

function up(knex) {
  return knex.schema.createTable(TABLES.PRODUCT, (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.decimal('price', 6, 2).notNullable();
    table.boolean('featured').notNullable().defaultTo(false);
    table.decimal('rating', 3, 2).notNullable().defaultTo(4.5);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.enum('company', COMPANY_NAMES);
  });
}

function down(knex) {
  return knex.raw(`DROP TABLE IF EXISTS ${TABLES.PRODUCT} CASCADE`);
}

export { up, down };

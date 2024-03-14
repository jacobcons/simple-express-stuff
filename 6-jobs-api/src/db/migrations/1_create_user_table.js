import knex from 'knex';

import {TABLES} from "../../constants/tables.constants.js";

function up(knex) {
  return knex.schema.createTable(TABLES.USER, (table) => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
  });
}

function down(knex) {
  return knex.raw(`DROP TABLE IF EXISTS "${TABLES.USER}" CASCADE`);
}

export { up, down };

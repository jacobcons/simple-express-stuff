import { TABLES } from '../../constants/tables.constants.js';

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex.raw(`TRUNCATE TABLE "${TABLES.PRODUCT}" RESTART IDENTITY CASCADE`);
}

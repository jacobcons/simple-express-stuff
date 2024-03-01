import { TABLES } from '../db.js';

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex.raw(`TRUNCATE TABLE ${TABLES.TASK} RESTART IDENTITY CASCADE`);
  await knex(TABLES.TASK).del();
  await knex(TABLES.TASK).insert([
    { description: 'Put out the bins' },
    { description: 'Walk dog' },
    { description: 'Do the laundry', is_completed: true },
  ]);
}

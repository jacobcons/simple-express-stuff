import { TABLES } from '../db.js';

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex.raw(`TRUNCATE TABLE "${TABLES.JOB}" RESTART IDENTITY CASCADE`);
  await knex(TABLES.JOB).insert([
    {
      user_id: 1,
      company: 'apple',
      position: 'backend developer',
      status: 'pending',
    },
    {
      user_id: 1,
      company: 'microsoft',
      position: 'devops',
      status: 'declined',
    },
    {
      user_id: 2,
      company: 'mcdonalds',
      position: 'manager',
      status: 'interview',
    },
  ]);
}

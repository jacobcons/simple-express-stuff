import { TABLES } from '../../constants/tables.constants.js';

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex.raw(`TRUNCATE TABLE "${TABLES.JOB}" RESTART IDENTITY CASCADE`);
  await knex(TABLES.JOB).insert([
    {
      user_id: 1,
      company: 'apple',
      position: 'backend developer',
      status: 'pending',
      created_at: new Date('2024-03-12'),
    },
    {
      user_id: 1,
      company: 'microsoft',
      position: 'devops',
      status: 'declined',
      created_at: new Date('2024-03-12'),
    },
    {
      user_id: 1,
      company: 'ibm',
      position: 'backend developer',
      status: 'declined',
      created_at: new Date('2023-10-20'),
    },
    {
      user_id: 1,
      company: 'microsun',
      position: 'ddd',
      status: 'accepted',
      created_at: new Date('2023-09-1'),
    },
    {
      user_id: 2,
      company: 'mcdonalds',
      position: 'manager',
      status: 'interview',
    },
  ]);
}

import { hashPassword } from '../../utils.js';
import { TABLES } from '../db.js';

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex.raw(`TRUNCATE TABLE "${TABLES.USER}" RESTART IDENTITY CASCADE`);
  await knex(TABLES.USER).insert([
    {
      name: 'joey',
      email: 'joey@gmail.com',
      password: await hashPassword('joeymcjoey'),
    },
    {
      name: 'bob',
      email: 'bob@gmail.com',
      password: await hashPassword('bobmcbob'),
    },
  ]);
}

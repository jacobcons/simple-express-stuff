import { TABLES } from '../db.js';
import products from './products.json' assert { type: 'json' };

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex.raw(`TRUNCATE TABLE ${TABLES.PRODUCT} RESTART IDENTITY CASCADE`);
  await knex(TABLES.PRODUCT).insert(products);
}

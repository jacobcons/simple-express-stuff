/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('task').del();
  await knex('task').insert([
    { description: 'Put out the bins' },
    { description: 'Walk dog' },
    { description: 'Do the laundry', is_completed: true },
  ]);
}

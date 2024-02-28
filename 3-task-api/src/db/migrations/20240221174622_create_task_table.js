import knex from 'knex';

function up(knex) {
  return knex.schema.createTable('task', (table) => {
    table.increments('id');
    table.string('description', 20).notNullable();
    table.boolean('is_completed').notNullable().defaultTo(false);
  });
}

function down(knex) {
  return knex.schema.dropTable('task');
}

export { up, down };

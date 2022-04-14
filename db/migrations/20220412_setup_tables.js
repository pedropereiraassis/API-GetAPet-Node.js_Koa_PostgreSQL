exports.up = async function(knex) {
  await knex.schema.createTable('users', function(table) {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('phone').notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable('pets', function(table) {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.integer('age').notNullable();
    table.string('weight').notNullable();
    table.string('color').notNullable();
    table.uuid('user_id').references('users.id').notNullable();
    table.uuid('adopter_id').nullable();
    table.boolean('available').defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('pets');
  await knex.schema.droptTable('user');
};
exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username');
    table.string('password');
    table.string('firstname');
    table.string('name');
    table.boolean('admin');
    table.string('facebookId');
    table.string('googleId');
    table.boolean('registered');
    table.string('addressName');
    table.string('street');
    table.string('house');
    table.string('bus');
    table.integer('postal');
    table.string('city');
    table.string('country');
    table.string('resetid');
    table.timestamp('resetexpiration');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('users'),
]);

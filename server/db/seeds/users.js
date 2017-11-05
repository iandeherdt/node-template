
const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) =>
  // Deletes ALL existing entries
  knex('users').del()
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync('template123', salt);
      return Promise.join(knex('users').insert({
        username: 'abc@xyz.com',
        password: hash,
        name: 'De Herdt',
      }));
    })
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync('template123', salt);
      return Promise.join(knex('users').insert({
        username: 'def@xyz.com',
        password: hash,
        admin: true,
        name: 'Thys',
      }));
    })
    .then(() => Promise.join(knex('users').insert({
      name: 'Ian De Herdt',
      facebookId: '123456',
    })));


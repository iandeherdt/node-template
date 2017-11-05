const knex = require('./../db/connection');
const NotFoundError = require('./../errors/notfound.error');

async function findUserByUserName(username) {
  const user = await knex('users').where({ username }).first();
  if (!user) {
    throw new NotFoundError();
  }
  return user;
}

async function findUserByFacebookId(facebookId) {
  const user = await knex('users').where({ facebookId }).first();
  if (!user) {
    throw new NotFoundError();
  }
  return user;
}

async function add(user) {
  return knex.insert(user);
}

module.exports = {
  findUserByUserName,
  findUserByFacebookId,
  add,
};


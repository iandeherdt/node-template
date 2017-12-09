const knex = require('./../db/connection');
const NotFoundError = require('./../errors/notfound.error');

const tableName = 'users';
async function findUserByUserName(username) {
  const user = await knex(tableName).where({ username }).first();
  if (!user) {
    throw new NotFoundError();
  }
  return user;
}

async function findById(id) {
  const user = await knex(tableName).where({ id }).first();
  if (!user) {
    throw new NotFoundError();
  }
  return user;
}

function userExists(username) {
  return knex(tableName).where({ username }).first();
}

async function findUserByFacebookId(facebookId) {
  const user = await knex(tableName).where({ facebookId }).first();
  if (!user) {
    throw new NotFoundError();
  }
  return user;
}

async function add(user) {
  return knex(tableName).insert(user);
}

async function update(id, user) {
  return knex(tableName).where({ id }).update(user);
}


module.exports = {
  findUserByUserName,
  findUserByFacebookId,
  add,
  userExists,
  update,
  findById,
};


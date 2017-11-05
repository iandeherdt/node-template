const knex = require('./../db/connection');
const NotFoundError = require('./../errors/notfound.error');

async function findUserByUserName(username) {
  const user = await knex('users').where({ username }).first();
  if (!user) {
    throw new NotFoundError();
  }
  return user;
}

module.exports = {
  findUserByUserName,
};


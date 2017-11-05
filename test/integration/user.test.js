const app = require('./../../index');
const request = require('supertest');
const authHelper = require('./../../server/helpers/auth.helpers');
const knex = require('../../server/db/connection');

describe('user tests', () => {
  beforeEach(async () => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run()));
  describe('POST /', () => {
    it('should create a new user', async () => {
    });
  });
});

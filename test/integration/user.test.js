const app = require('./../../app');
const request = require('supertest');
const knex = require('../../server/db/connection');
const emailHelper = require('../../server/helpers/email.helpers');

let emailSpy;

describe('user tests', () => {
  beforeEach(async () => {
    await knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
    emailSpy = spyOn(emailHelper, 'send');
  });
  describe('POST /', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/api/user')
        .set('Accept', 'application/json')
        .send({
          username: 'ian@xyz.com',
          password: 'dev123',
          name: 'de herdt',
          firstname: 'ian',
          confirmPassword: 'dev123',
          admin: false,
          street: 'street one',
          house: '5',
          bus: '1',
          postal: '2345',
          city: 'Beringen',
          country: 'Belgium',
        })
        .expect(200);
      expect(response.body).not.toBeUndefined();
      expect(emailSpy).toBeCalled();
    });
  });
});

const app = require('./../../app');
const request = require('supertest');
const knex = require('../../server/db/connection');
const emailHelper = require('../../server/helpers/email.helpers');
const authHelper = require('../../server/helpers/auth.helpers');
const userRepository = require('../../server/repositories/user.repository');

let emailSpy;

describe('user tests', () => {
  let token;
  beforeEach(async () => {
    await knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run());
    emailSpy = spyOn(emailHelper, 'send');
    const user = await userRepository.findUserByUserName('abc@xyz.com');
    token = authHelper.generateAccessToken(authHelper.createUserInfo('abc@xyz.com', user.id), '12h');
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
  describe('PUT /', () => {
    it('should throw a 401 if no authorization token is provided', async () => {
      await request(app)
        .put('/api/user')
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
        .expect(401);
    });
    it('should update the user', async () => {
      await request(app)
        .put('/api/user')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'de herdt',
          firstname: 'ben',
          admin: false,
          street: 'street one',
          house: '5',
          bus: '1',
          postal: '2345',
          city: 'Beringen',
          country: 'Belgium',
        })
        .expect(200);
    });
  });
});

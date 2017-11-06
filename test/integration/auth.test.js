const app = require('./../../app');
const request = require('supertest');
const authHelper = require('./../../server/helpers/auth.helpers');
const knex = require('../../server/db/connection');

describe('auth tests', () => {
  beforeEach(async () => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run()));
  describe('POST auth/login', () => {
    it('should generate an accesstoken for a valid user', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send({ username: 'abc@xyz.com', password: 'template123' })
        .expect(200);

      const decoded = authHelper.decode(response.body.accessToken);
      expect(decoded.username).toBe('abc@xyz.com');
      expect(decoded.id).not.toBeNull();
    });
    it('handle an invalid password', async () => {
      await request(app)
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send({ username: 'abc@xyz.com', password: 'pass12' })
        .expect(404);
    });

    it('should handle no password', async () => {
      await request(app)
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send({ email: 'abc@xyz.com', password: '' })
        .expect(400);
    });

    it('should handle no username', async () => {
      request(app)
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send({ username: '', password: 'pass123' })
        .expect(400);
    });
  });
});

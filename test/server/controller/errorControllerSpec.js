import request from 'supertest';
import app from '../../../src/server/app';
import httpStatusHelper from '../../../src/server/helper/httpStatusHelper';

describe('errorController', () => {
  it('GET /turing-microservice/internal/not-found', (done) => {
    request(app)
      .get('/turing-microservice/internal/not-found')
      .expect('Surrogate-Control', 'max-age=60')
      .expect(httpStatusHelper.NOT_FOUND, done);
  });
});

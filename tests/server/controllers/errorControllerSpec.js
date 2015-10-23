const request = require('supertest');

const app = require(require('path').join(__dirname, '..', '..', '..', 'server', 'app'));

describe('errorControllerSpec', () => {
  'use strict';

  it('GET /turing-microservice/internal/not-found', (done) => {
    request(app)
      .get('/turing-microservice/internal/not-found')
      .expect('Surrogate-Control', 'max-age=60')
      .expect(404, done);
  });
});

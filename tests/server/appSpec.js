const request = require('supertest');
const app = require('../../server/app');

describe('appSpec', () => {
  'use strict';

  it('GET /turing-microservice/assets/img/turing.jpg', (done) => {
    request(app)
      .get('/turing-microservice/assets/img/turing.jpg')
      .expect('Content-Type', 'image/jpeg')
      .expect(200, done);
  });
});

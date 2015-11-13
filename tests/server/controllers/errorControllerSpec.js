const request = require('supertest');
const app = require('../../../server/app');
const httpStatusHelper = require('../../../server/helper/httpStatusHelper');

describe('errorControllerSpec', () => {
  'use strict';

  it('GET /turing-microservice/internal/not-found', (done) => {
    request(app)
      .get('/turing-microservice/internal/not-found')
      .expect('Surrogate-Control', 'max-age=60')
      .expect(httpStatusHelper.NOT_FOUND, done);
  });
});

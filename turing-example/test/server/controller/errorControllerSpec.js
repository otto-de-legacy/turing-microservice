'use strict';

const request = require('supertest');

const app = require('../../../src/server/app');
const httpStatusHelper = require('../../../src/server/helper/httpStatusHelper');
const httpHeaderHelper = require('../../../src/server/helper/httpHeaderHelper');

describe('errorController', () => {
  it('GET /turing-example/internal/not-found', (done) => {
    request(app)
      .get('/turing-example/internal/not-found')
      .expect(httpHeaderHelper.SURROGATE_CONTROL, 'max-age=60')
      .expect(httpStatusHelper.NOT_FOUND, done);
  });
});

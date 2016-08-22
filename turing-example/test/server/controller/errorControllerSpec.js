'use strict';

const request = require('supertest');

const app = require('../../../src/server/app');
const HttpStatusHelper = require('../../../src/server/helper/httpStatusHelper');
const HttpHeaderHelper = require('../../../src/server/helper/httpHeaderHelper');

describe('errorController', () => {
  it('GET /turing-example/internal/not-found', (done) => {
    request(app)
      .get('/turing-example/internal/not-found')
      .expect(HttpHeaderHelper.SURROGATE_CONTROL, 'max-age=60')
      .expect(HttpStatusHelper.NOT_FOUND, done);
  });
});

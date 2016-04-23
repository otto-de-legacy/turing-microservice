'use strict';

const request = require('supertest');

const app = require('../../src/server/app');
const httpStatusHelper = require('../../src/server/helper/httpStatusHelper');
const httpHeaderHelper = require('../../src/server/helper/httpHeaderHelper');

describe('app', () => {
  it('GET /turing-example/img/turing.jpg', (done) => {
    request(app)
      .get('/turing-example/img/turing.jpg')
      .expect(httpHeaderHelper.CONTENT_TYPE, 'image/jpeg')
      .expect(httpStatusHelper.OK, done);
  });
});

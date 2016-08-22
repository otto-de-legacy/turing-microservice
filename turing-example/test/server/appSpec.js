'use strict';

const request = require('supertest');

const app = require('../../src/server/app');
const HttpStatusHelper = require('../../src/server/helper/httpStatusHelper');
const HttpHeaderHelper = require('../../src/server/helper/httpHeaderHelper');

describe('app', () => {
  it('GET /turing-example/img/turing.jpg', (done) => {
    request(app)
      .get('/turing-example/img/turing.jpg')
      .expect(HttpHeaderHelper.CONTENT_TYPE, 'image/jpeg')
      .expect(HttpStatusHelper.OK, done);
  });
});

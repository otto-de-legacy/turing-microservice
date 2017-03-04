'use strict';

const request = require('supertest');

const TuringExampleApp = require('../../src/server/app');
const HttpStatus = require('http-status');
const HttpHeader = require('../../src/server/helper/httpHeaderHelper');

describe('app', () => {
  it('GET /turing-example/img/turing.jpg', (done) => {
    request(new TuringExampleApp())
      .get('/turing-example/img/turing.jpg')
      .expect(HttpHeader.CONTENT_TYPE, 'image/jpeg')
      .expect(HttpStatus.OK, done);
  });
});

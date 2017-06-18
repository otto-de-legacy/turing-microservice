'use strict';

const request = require('supertest');

const TuringExampleApp = require('./App');
const HttpStatus = require('http-status');
const HttpHeader = require('./common/web/HttpHeader');

describe('app', () => {
  it('GET /turing-example/img/turing.jpg', (done) => {
    request(new TuringExampleApp())
      .get('/turing-example/img/turing.jpg')
      .expect(HttpHeader.CONTENT_TYPE, 'image/jpeg')
      .expect(HttpStatus.OK, (error) => {
        return error ? done.fail(error) : done();
      });
  });
});

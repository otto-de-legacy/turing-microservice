'use strict';

const request = require('supertest');

const TuringExampleApp = require('../../../src/server/app');
const HttpStatus = require('http-status');
const HttpHeader = require('../../../src/server/helper/httpHeaderHelper');

describe('errorController', () => {
  it('GET /turing-example/internal/not-found', (done) => {
    request(new TuringExampleApp())
      .get('/turing-example/internal/not-found')
      .expect(HttpHeader.SURROGATE_CONTROL, 'max-age=60')
      .expect(HttpStatus.NOT_FOUND, (error) => {
        return error ? done.fail(error) : done();
      });
  });
});

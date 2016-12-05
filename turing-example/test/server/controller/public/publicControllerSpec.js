'use strict';

const request = require('supertest');

const TuringExampleApp = require('../../../../src/server/app');
const HttpStatusHelper = require('../../../../src/server/helper/httpStatusHelper');

describe('publicController', () => {
  it('GET /turing-example/', (done) => {
    request(new TuringExampleApp())
      .get('/turing-example/')
      .expect(
        '<html><head><title>turing-example</title><link rel="stylesheet" href="/turing-example/css/main.css"/></head><body><div id="app"></div><script type="text/javascript" src="/turing-example/js/app.js"></script></body></html>')
      .expect(HttpStatusHelper.OK, done);
  });
});

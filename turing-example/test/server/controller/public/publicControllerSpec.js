'use strict';

const request = require('supertest');

const TuringExampleApp = require('../../../../src/server/app');
const HttpStatusHelper = require('../../../../src/server/helper/httpStatusHelper');

describe('publicController', () => {
  it('GET /turing-example/', (done) => {
    request(new TuringExampleApp())
      .get('/turing-example/')
      .expect(
        '<html>\n<head>\n  <title>turing-example</title>\n  <link rel="stylesheet" href="/turing-example/css/main.css"/>\n</head>\n<body>\n<div id="app"></div>\n<script type="text/javascript" src="/turing-example/js/app.js"></script>\n</body>\n</html>')
      .expect(HttpStatusHelper.OK, done);
  });
});

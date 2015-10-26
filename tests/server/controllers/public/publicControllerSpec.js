const request = require('supertest');
const app = require('../../../../server/app');

describe('publicController', () => {
  'use strict';

  it('GET /turing-microservice/', (done) => {
    request(app)
      .get('/turing-microservice/')
      .expect(
        '<html>\n<head>\n  <title>turing-microservice</title>\n</head>\n<body>\n<h1>turing-microservice</h1>\n</body>\n</html>')
      .expect(200, done);
  });
});

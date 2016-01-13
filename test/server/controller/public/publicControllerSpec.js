const request = require('supertest');
const app = require('../../../../src/server/app');
const httpStatusHelper = require('../../../../src/server/helper/httpStatusHelper');

describe('publicController', () => {
  it('GET /turing-microservice/', (done) => {
    request(app)
      .get('/turing-microservice/')
      .expect(
        '<html>\n<head>\n  <title>turing-microservice</title>\n  <link rel="stylesheet" href="/turing-microservice/css/main.css"/>\n</head>\n<body>\n<script type="text/javascript" src="/turing-microservice/js/app.js"></script>\n</body>\n</html>')
      .expect(httpStatusHelper.OK, done);
  });
});

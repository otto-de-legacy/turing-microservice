import request from 'supertest';
import app from '../../../../src/server/app';
import httpStatusHelper from '../../../../src/server/helper/httpStatusHelper';

describe('publicController', () => {
  it('GET /turing-microservice/', (done) => {
    request(app)
      .get('/turing-microservice/')
      .expect(
        '<html>\n<head>\n  <title>turing-microservice</title>\n  <link rel="stylesheet" href="/turing-microservice/css/main.css"/>\n</head>\n<body>\n<div id="app"></div>\n<script type="text/javascript" src="/turing-microservice/js/app.js"></script>\n</body>\n</html>')
      .expect(httpStatusHelper.OK, done);
  });
});

const request = require('supertest');
const app = require('../../../../src/server/app');
const httpStatusHelper = require('../../../../src/server/helper/httpStatusHelper');

describe('publicController', () => {
  it('GET /turing-microservice/', (done) => {
    request(app)
      .get('/turing-microservice/')
      .expect(
        '<html>\n<head>\n  <title>turing-microservice</title>\n  <link rel="stylesheet" href="/turing-microservice/css/frame.css"/>\n  <link rel="stylesheet" href="/turing-microservice/css/main.css"/>\n</head>\n<body>\n<div class="grid">\n  <div class="grid__container">\n    <h1>turing-microservice</h1>\n    <img class="turing-img" src="/turing-microservice/img/turing.jpg"/>\n  </div>\n  <div class="grid__info"></div>\n</div>\n</body>\n</html>')
      .expect(httpStatusHelper.OK, done);
  });
});

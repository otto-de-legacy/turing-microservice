const request = require('supertest');
const app = require('../../src/server/app');
const httpStatusHelper = require('../../src/server/helper/httpStatusHelper');

describe('app', () => {
  it('GET /turing-microservice/img/turing.jpg', (done) => {
    request(app)
      .get('/turing-microservice/img/turing.jpg')
      .expect('Content-Type', 'image/jpeg')
      .expect(httpStatusHelper.OK, done);
  });
});

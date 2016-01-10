const request = require('supertest');
const app = require('../../server/app');
const httpStatusHelper = require('../../server/helper/httpStatusHelper');

describe('appSpec', () => {
  it('GET /turing-microservice/img/turing.jpg', (done) => {
    request(app)
      .get('/turing-microservice/img/turing.jpg')
      .expect('Content-Type', 'image/jpeg')
      .expect(httpStatusHelper.OK, done);
  });
});

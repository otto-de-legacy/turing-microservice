import request from 'supertest';
import app from '../../src/server/app';
import httpStatusHelper from '../../src/server/helper/httpStatusHelper';

describe('app', () => {
  it('GET /turing-microservice/img/turing.jpg', (done) => {
    request(app)
      .get('/turing-microservice/img/turing.jpg')
      .expect('Content-Type', 'image/jpeg')
      .expect(httpStatusHelper.OK, done);
  });
});

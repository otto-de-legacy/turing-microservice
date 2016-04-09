const request = require('supertest');

const app = require('../../src/server/app');
const config = require('config');
const httpStatusHelper = require('../../src/server/helper/httpStatusHelper');

describe('app', () => {
  it(`GET ${config.get('turing-example:server:routes:root')}/img/turing.jpg`, (done) => {
    request(app)
      .get(`${config.get('turing-example:server:routes:root')}/img/turing.jpg`)
      .expect('Content-Type', 'image/jpeg')
      .expect(httpStatusHelper.OK, done);
  });
});

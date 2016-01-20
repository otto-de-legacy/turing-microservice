const request = require('supertest');

const app = require('../../../src/server/app');
const config = require('../../../resources/server/config');
const httpStatusHelper = require('../../../src/server/helper/httpStatusHelper');

describe('errorController', () => {
  it(`GET ${config.rootPath}/internal/not-found`, (done) => {
    request(app)
      .get(`${config.rootPath}/internal/not-found`)
      .expect('Surrogate-Control', 'max-age=60')
      .expect(httpStatusHelper.NOT_FOUND, done);
  });
});

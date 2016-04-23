'use strict';

const request = require('supertest');

const app = require('../../../src/server/app');
const config = require('turing-config');
const httpStatusHelper = require('../../../src/server/helper/httpStatusHelper');
const httpHeaderHelper = require('../../../src/server/helper/httpHeaderHelper');

describe('errorController', () => {
  it(`GET ${config.get('turing-example:server:routes:root')}/internal/not-found`, (done) => {
    request(app)
      .get(`${config.get('turing-example:server:routes:root')}/internal/not-found`)
      .expect(httpHeaderHelper.SURROGATE_CONTROL, 'max-age=60')
      .expect(httpStatusHelper.NOT_FOUND, done);
  });
});

'use strict';

const request = require('supertest');

const app = require('../../src/server/app');
const config = require('turing-config');
const httpStatusHelper = require('../../src/server/helper/httpStatusHelper');
const httpHeaderHelper = require('../../src/server/helper/httpHeaderHelper');

describe('app', () => {
  it(`GET ${config.get('turing-example:server:routes:root')}/img/turing.jpg`, (done) => {
    request(app)
      .get(`${config.get('turing-example:server:routes:root')}/img/turing.jpg`)
      .expect(httpHeaderHelper.CONTENT_TYPE, 'image/jpeg')
      .expect(httpStatusHelper.OK, done);
  });
});

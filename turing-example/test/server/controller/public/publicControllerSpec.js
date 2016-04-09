const request = require('supertest');

const app = require('../../../../src/server/app');
const config = require('config');
const httpStatusHelper = require('../../../../src/server/helper/httpStatusHelper');

describe('publicController', () => {
  it(`GET ${config.get('turing-example:server:routes:root')}/`, (done) => {
    request(app)
      .get(`${config.get('turing-example:server:routes:root')}/`)
      .expect(`<html>\n<head>\n  <title>turing-example</title>\n  <link rel="stylesheet" href="${config.get(
        'turing-example:server:routes:root')}/css/main.css"/>\n</head>\n<body>\n<div id="app"></div>\n<script type="text/javascript" src="${config.get(
        'turing-example:server:routes:root')}/js/app.js"></script>\n</body>\n</html>`)
      .expect(httpStatusHelper.OK, done);
  });
});

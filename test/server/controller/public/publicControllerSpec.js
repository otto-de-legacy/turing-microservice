const request = require('supertest');

const app = require('../../../../src/server/app');
const config = require('../../../../resources/server/config');
const httpStatusHelper = require('../../../../src/server/helper/httpStatusHelper');

describe('publicController', () => {
  it(`GET ${config.rootPath}/`, (done) => {
    request(app)
      .get(`${config.rootPath}/`)
      .expect(
        `<html>\n<head>\n  <title>turing-microservice</title>\n  <link rel="stylesheet" href="${config.rootPath}/css/main.css"/>\n</head>\n<body>\n<div id="app"></div>\n<script type="text/javascript" src="${config.rootPath}/js/app.js"></script>\n</body>\n</html>`)
      .expect(httpStatusHelper.OK, done);
  });
});

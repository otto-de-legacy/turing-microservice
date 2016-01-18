const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const request = require('supertest');
const app = require('../../../../src/server/app');
const statusService = require('../../../../src/server/service/internal/statusService');
const httpStatusHelper = require('../../../../src/server/helper/httpStatusHelper');

describe('internalController', () => {
  it('GET /turing-microservice/internal/health', (done) => {
    request(app)
      .get('/turing-microservice/internal/health')
      .expect('')
      .expect(httpStatusHelper.OK, done);
  });

  it('GET /turing-microservice/internal/status', (done) => {
    const getStatusSpy = sinon.spy(statusService, 'getStatus');
    request(app)
      .get('/turing-microservice/internal/status')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(httpStatusHelper.OK)
      .end((err) => {
        if (err) {
          done(err);
        } else {
          expect(getStatusSpy).to.have.callCount(1);
          done();
        }
      });
  });
});

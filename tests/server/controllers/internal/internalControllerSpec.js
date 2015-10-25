const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const request = require('supertest');
const app = require('../../../../server/app');
const statusService = require('../../../../server/services/internal/statusService');

describe('internalController', () => {
  'use strict';

  it('GET /turing-microservice/internal/health', (done) => {
    request(app)
      .get('/turing-microservice/internal/health')
      .expect('')
      .expect(200, done);
  });

  it('GET /turing-microservice/internal/status', (done) => {
    const getStatusSpy = sinon.spy(statusService, 'getStatus');
    request(app)
      .get('/turing-microservice/internal/status')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
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

import chai from 'chai';
import {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import request from 'supertest';
import app from '../../../../src/server/app';
import statusService from '../../../../src/server/service/internal/statusService';
import httpStatusHelper from '../../../../src/server/helper/httpStatusHelper';

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

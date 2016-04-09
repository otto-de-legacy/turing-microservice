const expect = require('chai').expect;

const statusService = require('../../../../src/server/service/internal/statusService');

describe('statusService', () => {
  it('expect to get status page with all details', () => {
    // given

    // when
    const status = statusService.getStatus();

    // then
    expect(status).to.have.all.keys([
      'application',
      'system'
    ]);

    expect(status.application).to.have.all.keys([
      'name',
      'version',
      'git',
      'config',
      'status',
      'message',
      'statusDetails',
      'dependencies',
      'versions',
      'pid',
      'cwd',
      'env',
      'uptime',
      'memoryUsage'
    ]);

    expect(status.system).to.have.all.keys([
      'hostname',
      'port',
      'platform',
      'arch',
      'release',
      'systemTime',
      'uptime'
    ]);
  });
});

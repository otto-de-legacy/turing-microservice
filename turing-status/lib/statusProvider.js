'use strict';

const pkg = require(require('path').join(process.cwd(), 'package.json'));
const config = require('turing-config');
const getAggregatedStatus = require('./statusHelper').getAggregatedStatus;
const os = require('os');

module.exports = (() => {
  const statusDetails = {};

  // TODO: Add validation for status OK, WARNING, ERROR and having a message
  // TODO: Switch to event based status updating
  function addStatusDetail(name, statusDetail) {
    statusDetails[name] = statusDetail;
  }

  function getStatus() {
    return {
      application: {
        name: pkg.name,
        description: pkg.description,
        group: config.get('turing:status:application:group'),
        environment: process.env.NODE_ENV,
        version: pkg.version,
        commit: pkg.commit,
        vcsUrl: pkg.repository.url,
        status: getAggregatedStatus(statusDetails),
        statusDetails,
        dependencies: pkg.dependencies,
        versions: process.versions,
        pid: process.pid,
        cwd: process.cwd(),
        applicationUptime: process.uptime(),
        memoryUsage: process.memoryUsage()
      },
      system: {
        hostname: os.hostname(),
        port: config.get('turing:server:port'),
        platform: os.platform(),
        arch: os.arch(),
        release: os.release(),
        systemUpTime: os.uptime(),
        systemTime: new Date().toISOString()
      },
      team: {
        name: config.get('turing:status:team:name'),
        technicalContact: config.get('turing:status:team:contact:technical'),
        businessContact: config.get('turing:status:team:contact:business')
      }
    };
  }

  return {
    addStatusDetail,
    getStatus
  };
})();

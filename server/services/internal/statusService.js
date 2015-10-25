const os = require('os');
const packageJson = require('../../../package.json');
const aggregatedStatusHelper = require('../../helper/aggregatedStatusHelper');

module.exports = (() => {
  'use strict';

  function getStatusDetails() {
    return {};
  }

  function getApplicationStatus() {
    const statusDetails = getStatusDetails();
    const aggregatedStatus = aggregatedStatusHelper.getAggregatedStatus(statusDetails);
    return {
      name: packageJson.name,
      version: packageJson.version,
      git: packageJson.repository.url,
      status: aggregatedStatus.status,
      message: aggregatedStatus.message,
      statusDetails,
      dependencies: packageJson.dependencies,
      versions: process.versions,
      pid: process.pid,
      cwd: process.cwd(),
      env: process.env,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage()
    };
  }

  function getSystemStatus() {
    return {
      hostname: os.hostname(),
      port: process.env.SERVER_PORT,
      platform: os.platform(),
      arch: os.arch(),
      release: os.release(),
      systemTime: new Date(),
      uptime: os.uptime()
    };
  }

  function getStatus() {
    return {
      application: getApplicationStatus(),
      system: getSystemStatus()
    };
  }

  return {
    getStatus
  };
})();

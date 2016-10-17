'use strict';

const pkg = require(require('path').join(process.cwd(), 'package.json'));
const config = require('turing-config');
const Status = require('./status');
const StatusHelper = require('./statusHelper');
const StatusValidator = require('./statusValidator');
const os = require('os');

module.exports = class StatusProvider {
  constructor() {
    this.statusDetails = {};
    this._status = new Status();
  }

  get status() {
    return {
      application: {
        name: pkg.name,
        description: pkg.description,
        group: config.get('turing:status:application:group'),
        environment: process.env.ACTIVE_PROFILE,
        nodeEnv: process.env.NODE_ENV,
        version: pkg.version,
        commit: pkg.commit,
        vcsUrl: pkg.repository ? pkg.repository.url : '',
        status: new StatusHelper().getAggregatedStatus(this.statusDetails),
        statusDetails: this.statusDetails,
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

  addStatusDetail(name, status, message) {
    const statusDetail = {
      status,
      message
    };
    StatusValidator.assertValidName(name);
    StatusValidator.assertValidStatusDetail(statusDetail, this._status.statuses);
    this.statusDetails[name] = statusDetail;
  }
};

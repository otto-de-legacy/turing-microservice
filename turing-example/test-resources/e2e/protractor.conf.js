'use strict';

const process = require('process');
const {SpecReporter} = require('jasmine-spec-reporter');

exports.config = {
  framework: 'jasmine',
  suites: {
    parallel: `${__dirname}/../../test/e2e/*Spec.js`
  },
  suite: 'parallel',
  seleniumAddress: process.env.SELENIUM_HOST,
  maxInstances: 10,
  useBlockingProxy: false,
  capabilities: {
    browserName: 'chrome',
    // dont shard when on local to be able to attach to process
    shardTestFiles: !!process.env.SELENIUM_HOST,
    maxInstances: 10
  },
  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  },
  jasmineNodeOpts: {
    print: () => {
      return null;
    },
    defaultTimeoutInterval: 20001
  },
  sync: true,
  logLevel: 'verbose',
  coloredLogs: true,
  baseUrl: process.env.BASE_DOMAIN,
  waitforTimeout: 20001,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3
};

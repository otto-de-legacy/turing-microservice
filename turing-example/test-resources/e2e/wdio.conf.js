'use strict';

module.exports.config = {
  host: '',
  port: 4444,
  path: '/wd/hub',
  specs: [
    `${__dirname}/../../test/e2e/**/*Spec.js`
  ],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'chrome'
    }
  ],
  sync: true,
  logLevel: 'verbose',
  coloredLogs: true,
  screenshotPath: `${__dirname}/../../target/errorShots/e2e`,
  baseUrl: 'http://www.google.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'jasmine',
  reporters: ['spec']
};

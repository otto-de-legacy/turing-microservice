'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');
const {SpecReporter} = require('jasmine-spec-reporter');
const screenshotDir = `${__dirname}/../../target/errorShots/e2e/`;

screenshotDir.split('/').forEach((dir, index, splits) => {
  const parent = splits.slice(0, index).join('/');
  const dirPath = path.resolve(parent, dir);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
});

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
    jasmine.getEnv().addReporter(new function screenshotReporter() {
      screenshotReporter.specDone = (result) => {
        if (result.failedExpectations.length > 0) {
          browser.takeScreenshot().then((png) => {
            const stream = fs.createWriteStream(`${screenshotDir}${new Date().getTime()}.png`);
            stream.write(new Buffer(png, 'base64'));
            stream.end();
          });
        }
      };
    }());
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

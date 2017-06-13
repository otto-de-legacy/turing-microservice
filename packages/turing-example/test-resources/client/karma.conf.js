'use strict';

const os = require('os');

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: [
      'jasmine-jquery',
      'jasmine'
    ],
    files: [
      // fixtures
      {
        pattern: './fixture/**/*',
        included: false
      },
      // testHelper
      '../../test/client/initUtil.js',
      // specs
      '../../test/client/testsContext.js'
    ],
    exclude: [],
    preprocessors: {
      '../../test/client/testsContext.js': ['webpack']
    },
    reporters: [
      'kjhtml',
      'mocha',
      'coverage'
    ],
    coverageReporter: {
      type: 'lcov',
      dir: '../../target/coverage/client'
    },
    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            use: 'isparta-loader',
            exclude: /(test|node_modules)\//
          },
          {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules\//
          },
          {
            test: /\.scss$/,
            use: [
              'css-loader',
              {
                loader: 'sass-loader',
                options: {outputStyle: 'compressed'}
              }
            ]
          }
        ]
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browserConsoleLogOptions: {
      level: 'log',
      terminal: true
    },
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: os.cpus().length
  });
};

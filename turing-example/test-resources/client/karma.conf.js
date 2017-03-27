'use strict';

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: [
      'mocha',
      'chai-dom',
      'chai-sinon',
      'fixture'
    ],
    files: [
      // static files which are not included, only served -> will be accessible by `/base/fixture/static/..`
      {
        pattern: './fixture/static/**/*',
        included: false
      },
      // fixtures
      './fixture/**/*.html',
      // testHelper
      '../../test/client/testHelper.js',
      // specs
      '../../test/client/specsContext.js'
    ],
    exclude: [],
    preprocessors: {
      '../../test/client/testHelper.js': ['babel'],
      '../../test/client/specsContext.js': ['webpack'],
      './fixture/**/*.html': ['html2js']
    },
    reporters: [
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
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};

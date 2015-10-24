module.exports = (config) => {
  'use strict';

  const sourceJsAssetsDir = '../../public/assets/js/';
  const testJsAssetsDir = 'assets/js/';

  config.set({
    basePath: '',
    frameworks: [
      'mocha',
      'chai-sinon',
      'fixture'
    ],
    files: [
      // js
      `${sourceJsAssetsDir}critical/public/thirdparty/**/*.js`,
      `${sourceJsAssetsDir}critical/public/**/*.js`,
      `${sourceJsAssetsDir}critical/private/**/*.js`,
      `${sourceJsAssetsDir}non-critical/public/**/*.js`,
      `${sourceJsAssetsDir}non-critical/private/**/*.js`,
      // fixtures
      `${testJsAssetsDir}fixtures/**/*.html`,
      // testHelper
      `${testJsAssetsDir}testHelper.js`,
      // specs
      `${testJsAssetsDir}specs/**/*Spec.js`
    ],
    exclude: [],
    preprocessors: {
      [`${sourceJsAssetsDir}**/*.js`]: [
        'babel',
        'coverage'
      ],
      [`${testJsAssetsDir}**/*.js`]: ['babel'],
      '**/*.html': ['html2js']
    },
    reporters: [
      'progress',
      'coverage'
    ],
    coverageReporter: {
      type: 'lcov',
      dir: '../../target/coverage/public'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};

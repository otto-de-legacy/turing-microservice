module.exports = (config) => {
  const sourceJsAssetsDir = '../../src/server/public/';
  const testJsAssetsDir = './component/';

  config.set({
    basePath: '',
    frameworks: [
      'mocha',
      'chai-sinon',
      'fixture'
    ],
    files: [
      // phantomjs es5 shim
      '../../node_modules/core-js/client/shim.min.js',
      // js
      `${sourceJsAssetsDir}**/*.js`,
      // fixtures
      `${testJsAssetsDir}fixture/**/*.html`,
      // testHelper
      `${testJsAssetsDir}testHelper.js`,
      // specs
      `${testJsAssetsDir}spec/**/*Spec.js`
    ],
    exclude: [],
    preprocessors: {
      [`${testJsAssetsDir}**/*.js`]: ['babel'],
      '**/*.html': ['html2js']
    },
    reporters: [
      'progress'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};

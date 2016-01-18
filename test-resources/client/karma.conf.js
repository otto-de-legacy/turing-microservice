module.exports = (config) => {
  const sourceJsAssetsDir = '../../resources/server/public/';
  const testJsAssetsDir = '../../test/client/';

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
      './fixture/**/*.html',
      // testHelper
      `${testJsAssetsDir}testHelper.js`,
      // specs
      `${testJsAssetsDir}component/**/*Spec.js`
    ],
    exclude: [],
    preprocessors: {
      [`${testJsAssetsDir}**/*.js`]: ['babel'],
      './fixture/**/*.html': ['html2js']
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

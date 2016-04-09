module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: [
      'mocha',
      'chai-sinon',
      'fixture'
    ],
    files: [
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
        loaders: [
          {
            test: /\.(js|jsx)$/,
            loaders: ['babel-loader'],
            exclude: /node_modules\//
          },
          {
            test: /\.scss$/,
            loader: 'css-loader!sass-loader'
          }
        ],
        postLoaders: [
          {
            test: /\.(js|jsx)$/,
            loader: 'istanbul-instrumenter',
            exclude: /(test|node_modules)\//
          }
        ]
      },
      sassLoader: {
        outputStyle: 'compressed'
      },
      resolve: {
        extensions: [
          '',
          '.js',
          '.jsx'
        ]
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};

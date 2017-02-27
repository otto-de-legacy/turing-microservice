'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');

const webpackClientConfig = require('../resources/client/webpack/webpack-client.config.js');

gulp.task('build', (done) => {
  function handleWebpackOutput(error, stats) {
    if (error) {
      throw new gutil.PluginError('webpack', error);
    }

    gutil.log('[webpack]', stats.toString({
      colors: true,
      chunks: false
    }));
  }

  webpack(webpackClientConfig).run((error, stats) => {
    handleWebpackOutput(error, stats);
    done();
  });
});

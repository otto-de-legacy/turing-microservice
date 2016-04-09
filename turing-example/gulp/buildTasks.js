'use strict';

const gulp = require('gulp');
const webpack = require('webpack-stream');

const webpackClientConfig = require('../resources/client/webpack/webpack-client.config.js');

gulp.task('build', () => gulp.src('./src/client/app.jsx')
  .pipe(webpack(webpackClientConfig))
  .pipe(gulp.dest('./resources/server/public')));

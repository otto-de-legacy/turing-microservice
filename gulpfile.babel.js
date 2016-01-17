import eslint from 'gulp-eslint';
import gulp from 'gulp';
import {Server as KarmaServer} from 'karma';
import mocha from 'gulp-mocha';
import runSequence from 'run-sequence';
import webpack from 'webpack-stream';

import webpackClientConfig from './resources/webpack/webpack-client.config';
import webpackServerConfig from './resources/webpack/webpack-server.config';
import webpackServerDevConfig from './resources/webpack/webpack-server-dev.config';

gulp.task('build-client', () =>
  gulp.src('./src/client/app.jsx')
    .pipe(webpack(webpackClientConfig))
    .pipe(gulp.dest('./src/server/public')));

gulp.task('build-server', () =>
  gulp.src('./src/server/server.js')
    .pipe(webpack(webpackServerConfig))
    .pipe(gulp.dest('./target/server')));

gulp.task('build', (callback) => {
  runSequence('build-client', 'build-server', callback);
});

gulp.task('watch', () =>
  gulp.src('./src/server/server.js')
    .pipe(webpack(webpackServerDevConfig))
    .pipe(gulp.dest('./target/server')));

gulp.task('eslint', () => {
  const jsFiles = [
    './**/*.js',
    './**/*.jsx',
    '!./node_modules/**/*.js',
    '!./src/server/public/**/*.js',
    '!./target/**/*.js'
  ];
  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('testServer', () => {
  process.env.NODE_ENV = 'production';

  return gulp.src('./test/server/**/*Spec.js')
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('testPublic', (done) => {
  new KarmaServer({
    configFile: `${__dirname}/test/client/karma.conf.js`,
    singleRun: true
  }, done).start();
});

gulp.task('test', (callback) => {
  runSequence('eslint', 'testServer', 'testPublic', callback);
});

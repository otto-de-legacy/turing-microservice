import eslint from 'gulp-eslint';
import gulp from 'gulp';
import istanbul from 'gulp-istanbul';
import {Server as KarmaServer} from 'karma';
import mocha from 'gulp-mocha';
import runSequence from 'run-sequence';
import webpack from 'webpack-stream';

import webpackClientConfig from './resources/webpack/webpack-client.config';
import webpackServerConfig from './resources/webpack/webpack-server.config';

gulp.task('build-client', () =>
  gulp.src('./src/client/app.jsx')
    .pipe(webpack(webpackClientConfig))
    .pipe(gulp.dest('./src/server/public')));

gulp.task('build-server', () => {
  gulp.src('./src/server/server.js')
    .pipe(webpack(webpackServerConfig))
    .pipe(gulp.dest('./target/server'));

  gulp.src('./src/server/public/**/*')
    .pipe(gulp.dest('./target/server/public'));

  return gulp.src('./src/server/view/**/*')
    .pipe(gulp.dest('./target/server/view'));
});

gulp.task('eslint', () => {
  const jsFiles = [
    './**/*.js',
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

  const jsFiles = [
    './src/server/**/*.js',
    '!./src/server/public/**/*.js'
  ];

  gulp.src(jsFiles)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());

  return gulp.src('./test/server/**/*Spec.js')
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports({
      dir: './target/coverage/server',
      reporters: ['lcov']
    }));
});

gulp.task('testPublic', (done) => {
  new KarmaServer({
    configFile: `${__dirname}/test/client/karma.conf.js`,
    singleRun: true
  }, done).start();
});

gulp.task('build', (callback) => {
  runSequence('build-client', 'build-server', callback);
});

gulp.task('test', (callback) => {
  runSequence('eslint', 'testServer', 'testPublic', callback);
});

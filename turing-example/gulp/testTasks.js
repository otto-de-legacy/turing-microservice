'use strict';

const eslint = require('gulp-eslint');
const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const KarmaServer = require('karma').Server;
const mocha = require('gulp-mocha');
const runSequence = require('run-sequence');

gulp.task('eslint', () => {
  const jsFiles = [
    './**/*.js',
    './**/*.jsx',
    '!./node_modules/**',
    '!./resources/server/public/**',
    '!./target/**'
  ];
  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('testServer', () => {
  process.env.TURING_CONFIG_DIR = './test-resources/server/config';

  gulp.src('./src/server/**/*.js')
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
    configFile: `${__dirname}/../test-resources/client/karma.conf.js`,
    singleRun: true
  }, done).start();
});

gulp.task('test', (done) => {
  runSequence('eslint', 'testServer', 'testPublic', done);
});

'use strict';

const gulp = require('gulp');
const sassLint = require('gulp-sass-lint');
const eslint = require('gulp-eslint');
const istanbul = require('gulp-istanbul');
const jasmine = require('gulp-jasmine');
const {SpecReporter} = require('jasmine-spec-reporter');
const {Server: KarmaServer} = require('karma');
const runSequence = require('run-sequence');

gulp.task('sasslint', () => {
  return gulp.src([
    './**/*.scss',
    '!./node_modules/**/*.scss',
    '!./out/**/*.scss',
    '!./target/**/*.scss'
  ])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('eslint', () => {
  return gulp.src([
    './**/*.js',
    '!./node_modules/**',
    '!./out/**/*.js',
    '!./resources/server/public/**',
    '!./target/**'
  ]).pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('istanbul', () => {
  return gulp.src('./src/server/**/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test:server', ['istanbul'], () => {
  process.env.TURING_CONFIG_DIR = './test-resources/server/config';
  return gulp.src('./test/server/**/*.test.js')
    .pipe(jasmine({
      reporter: new SpecReporter({
        summary: {
          displayStacktrace: true
        }
      })
    }))
    .pipe(istanbul.writeReports({
      dir: './target/coverage/server',
      reporters: ['lcov']
    }));
});

gulp.task('test:client', (done) => {
  const karmaOptions = {
    configFile: `${__dirname}/../test-resources/client/karma.conf.js`,
    autoWatch: false,
    singleRun: true,
    reporters: [
      'mocha',
      'coverage'
    ]
  };

  new KarmaServer(karmaOptions, (exitCode) => {
    if (exitCode === 0) {
      done();
    }
    process.exit(exitCode);
  }).start();
});

gulp.task('test', (done) => {
  runSequence('sasslint', 'eslint', 'test:server', 'test:client', done);
});

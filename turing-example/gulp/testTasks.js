'use strict';

const gulp = require('gulp');
const sassLint = require('gulp-sass-lint');
const eslint = require('gulp-eslint');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const {Server: KarmaServer} = require('karma');
const webdriver = require('gulp-webdriver');
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
  return gulp.src('./test/server/**/*Spec.js')
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports({
      dir: './target/coverage/server',
      reporters: ['lcov']
    }));
});

gulp.task('test:public', (done) => {
  new KarmaServer({
    configFile: `${__dirname}/../test-resources/client/karma.conf.js`,
    singleRun: true
  }, done).start();
});

gulp.task('test:e2e', () => {
  return gulp.src(`${__dirname}/../test-resources/e2e/wdio.conf.js`).pipe(webdriver());
});

gulp.task('test', (done) => {
  runSequence('sasslint', 'eslint', 'test:server', 'test:public', done);
});

'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const KarmaServer = require('karma').Server;
const runSequence = require('run-sequence');

gulp.task('eslint', () =>
  gulp.src([
    './**/*.js',
    './**/*.jsx',
    '!./node_modules/**',
    '!./out/**/*.js',
    '!./resources/server/public/**',
    '!./target/**'
  ]).pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('istanbul', () =>
  gulp.src('./src/server/**/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
);

gulp.task('testServer', ['istanbul'], () =>
  gulp.src('./test/server/**/*Spec.js')
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports({
      dir: './target/coverage/server',
      reporters: ['lcov']
    }))
);

gulp.task('testPublic', (done) => {
  new KarmaServer({
    configFile: `${__dirname}/../test-resources/client/karma.conf.js`,
    singleRun: true
  }, done).start();
});

gulp.task('test', (done) => {
  runSequence('eslint', 'testServer', 'testPublic', done);
});

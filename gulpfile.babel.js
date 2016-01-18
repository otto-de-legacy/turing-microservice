const eslint = require('gulp-eslint');
const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const KarmaServer = require('karma').Server;
const mocha = require('gulp-mocha');
const runSequence = require('run-sequence');
const webpack = require('webpack-stream');

const webpackClientConfig = require('./resources/client/webpack/webpack-client.config.js');

gulp.task('build-client', () =>
  gulp.src('./src/client/app.jsx')
    .pipe(webpack(webpackClientConfig))
    .pipe(gulp.dest('./resources/server/public')));

gulp.task('build', (callback) => {
  runSequence('build-client', callback);
});

gulp.task('eslint', () => {
  const jsFiles = [
    './**/*.js',
    './**/*.jsx',
    '!./node_modules/**/*.js',
    '!./resources/server/public/**/*.js',
    '!./target/**/*.js'
  ];
  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('testServer', () => {
  process.env.NODE_ENV = 'production';

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
    configFile: `${__dirname}/test-resources/client/karma.conf.js`,
    singleRun: true
  }, done).start();
});

gulp.task('test', (callback) => {
  runSequence('eslint', 'testServer', 'testPublic', callback);
});

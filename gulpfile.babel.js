import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import istanbul from 'gulp-istanbul';
import {Server as KarmaServer} from 'karma';
import mocha from 'gulp-mocha';
import runSequence from 'run-sequence';
import sass from 'gulp-sass';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';

const targetAssetsDir = './target/assets/';
const sourceAssetsDir = './public/assets/';

gulp.task('sass', () => {
  const targetCssAssetsDir = `${targetAssetsDir}css/`;

  del.sync(targetCssAssetsDir);

  return gulp.src(`${sourceAssetsDir}scss/**/*.scss`)
    .pipe(sass({
      outputStyle: 'compressed',
      relativeAssets: true,
      lineComments: false,
      errLogToConsole: true
    }))
    .pipe(gulp.dest(targetCssAssetsDir));
});

gulp.task('browserify', () => {
  const targetJsAssetsDir = `${targetAssetsDir}js/`;

  del.sync(targetJsAssetsDir);

  const browserified = browserify(`${sourceAssetsDir}js/critical/public/index.jsx`, {
    extensions: ['.jsx'],
    debug: true,
    transform: [babelify]
  });
  return browserified.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(targetJsAssetsDir));
});

gulp.task('eslint', () => {
  const jsFiles = [
    './**/*.js',
    '!./node_modules/**/*.js',
    '!./target/**/*.js'
  ];
  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('testServer', () => {
  gulp.src(['./server/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());

  return gulp.src('./tests/server/**/*Spec.js')
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports({
      dir: './target/coverage/server',
      reporters: ['lcov']
    }));
});

gulp.task('testPublic', (done) => {
  new KarmaServer({
    configFile: `${__dirname}/tests/public/karma.conf.js`,
    singleRun: true
  }, done).start();
});

gulp.task('test', (callback) => {
  runSequence('eslint', 'testServer', 'testPublic', callback);
});

gulp.task('build', (callback) => {
  process.env.NODE_ENV = 'production';
  runSequence([
    'sass',
    'browserify'
  ], callback);
});

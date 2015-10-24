const babel = require('gulp-babel');
const del = require('del');
const eslint = require('gulp-eslint');
const gulp = require('gulp-param')(require('gulp'), process.argv);
const KarmaServer = require('karma').Server;
const mocha = require('gulp-mocha');
const path = require('path');
const sass = require('gulp-sass');

const targetAssetsDir = 'target/assets/';
const sourceAssetsDir = 'public/assets/';

gulp.task('default', ['test']);

gulp.task('test', ['testServer:eslint:babel:sass']);

gulp.task('sass', () => {
  'use strict';

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

gulp.task('babel:sass', ['sass'], () => {
  'use strict';

  const targetJsAssetsDir = `${targetAssetsDir}js/`;

  del.sync(targetJsAssetsDir);

  return gulp.src(`${sourceAssetsDir}js/**/*.js`)
    .pipe(babel())
    .pipe(gulp.dest(targetJsAssetsDir));
});

gulp.task('eslint:babel:sass', ['babel:sass'], () => {
  'use strict';

  const jsFiles = [
    '**/*.js',
    '!bower_components/**/*.js',
    '!node_modules/**/*.js',
    '!target/**/*.js'
  ];
  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('testServer:eslint:babel:sass', ['eslint:babel:sass'], () => {
  'use strict';

  return gulp.src('tests/server/**/*Spec.js')
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('testPublic:testServer:eslint:babel:sass', ['testServer:eslint:babel:sass'], (done) => {
  'use strict';

  new KarmaServer({
    configFile: path.join(__dirname, 'tests', 'public', 'karma.conf.js'),
    singleRun: true
  }, done).start();
});

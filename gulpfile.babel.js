'use strict';

const eslint = require('gulp-eslint');
const gulp = require('gulp');

gulp.task('test', () => {
  const jsFiles = [
    './**/*.js',
    './**/*.jsx',
    '!node_modules/**',
    '!./turing-example/resources/server/public/**',
    '!./turing-example/target/**'
  ];
  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

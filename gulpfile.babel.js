'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('test', () => {
  const jsFiles = [
    './**/*.js',
    './**/*.jsx',
    '!./node_modules/**',
    '!./**/node_modules/**',
    '!./turing-example/resources/server/public/**',
    '!./turing-example/target/**'
  ];
  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

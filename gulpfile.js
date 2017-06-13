'use strict';

const gulp = require('gulp');
const gulpStylelint = require('gulp-stylelint');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');

gulp.task('stylelint', () => {
  return gulp.src([
    './**/*.scss',
    '!./node_modules/**/*.scss',
    '!./**/node_modules/**/*.scss',
    '!./packages/turing-example/target/**/*.scss'
  ])
    .pipe(gulpStylelint({
      reporters: [
        {
          formatter: 'string',
          console: true
        }
      ],
      failAfterError: true
    }));
});

gulp.task('eslint', () => {
  return gulp.src([
    './**/*.js',
    '!./node_modules/**',
    '!./**/node_modules/**',
    '!./packages/turing-example/resources/server/public/**',
    '!./packages/turing-example/target/**'
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', (done) => {
  runSequence('stylelint', 'eslint', done);
});

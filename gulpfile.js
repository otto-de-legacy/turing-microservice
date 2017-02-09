'use strict';

const gulp = require('gulp');
const sassLint = require('gulp-sass-lint');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');

gulp.task('sasslint', () => {
  return gulp.src([
    './**/*.scss',
    '!./node_modules/**/*.scss',
    '!./**/node_modules/**/*.scss',
    '!./turing-example/target/**/*.scss'
  ])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('eslint', () => {
  return gulp.src([
    './**/*.js',
    './**/*.jsx',
    '!./node_modules/**',
    '!./**/node_modules/**',
    '!./turing-example/resources/server/public/**',
    '!./turing-example/target/**'
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', (done) => {
  runSequence('sasslint', 'eslint', done);
});

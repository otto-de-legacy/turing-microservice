'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('watch', () => {
  nodemon({
    script: './bin/server.js',
    watch: [
      'bin',
      'resources/client',
      'resources/server/config',
      'resources/server/public/img',
      'resources/server/view',
      'src'
    ],
    ext: 'js scss html json',
    env: {
      NODE_ENV: 'local',
      TURING_CONFIG_DIR: './resources/server/config'
    },
    tasks: () => []
  });
});

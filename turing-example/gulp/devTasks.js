'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

gulp.task('watch', () => {
  nodemon({
    script: './bin/server.js',
    ext: 'js scss html json',
    watch: [
      'bin',
      'resources/client',
      'resources/server/config',
      'resources/server/view',
      'src'
    ],
    env: {
      ACTIVE_PROFILE: 'local',
      TURING_CONFIG_DIR: './resources/server/config'
    },
    tasks: () => {
      return [];
    }
  });
});

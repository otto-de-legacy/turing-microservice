'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const {Server: KarmaServer} = require('karma');

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

gulp.task('watch:test', (done) => {
  const karmaOptions = {
    configFile: `${__dirname}/../test-resources/client/karma.conf.js`
  };

  new KarmaServer(karmaOptions, (exitCode) => {
    if (exitCode === 0) {
      done();
    }
    process.exit(exitCode);
  }).start();
});

import gulp from 'gulp';
import istanbul from 'gulp-istanbul';
import {Server as KarmaServer} from 'karma';
import mocha from 'gulp-mocha';
import runSequence from 'run-sequence';

gulp.task('testServer', () => {
  process.env.NODE_ENV = 'production';

  const jsFiles = [
    './src/server/**/*.js',
    '!./src/server/public/**/*.js'
  ];

  gulp.src(jsFiles)
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
    configFile: `${__dirname}/test/client/karma.conf.js`,
    singleRun: true
  }, done).start();
});

gulp.task('test', (callback) => {
  runSequence('testServer', 'testPublic', callback);
});

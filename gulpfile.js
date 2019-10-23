const gulp = require('gulp');
const runSequence = require('run-sequence');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const less = require('gulp-less');
const gutil = require('gulp-util');

// start gulp task by cleaning then running serve
gulp.task('default', function(done) {
  runSequence('clean', ['less', 'concatScripts'], function() {
    // console.log('Run something else');
    done(); // This is what lets gulp know this task is complete!
  });
});

// clean the build folder - delete all the files so they can be rebuilt
gulp.task('clean', function() {
  console.log('gulp clean task');
  return gulp.src([ // return acts as sort of a promise, without the return statement, other tasks wont know until the clean task is finished.
    'build/'
  ])
  .pipe(clean());
});

// take the styles in less/styles.less file and convert them to .css and push them to the build/css folder
gulp.task('less', function() {
  return gulp.src('less/styles.less')
    .pipe(less())
    .pipe(gulp.dest('build/css'))
});

// concat js files in the js folder and build them to the build/js folder
gulp.task('concatScripts', function() {
  console.log('gulp concatScripts task');
  return gulp.src([
    'js/*.js'
  ])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('build/js'))
  .on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(gulp.dest('build/js'))
});
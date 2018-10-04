var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
browserSync = require('browser-sync').create();


gulp.task('previewDist', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "docs"
    }
  });
});

gulp.task('deleteDistFolder',function() {
  return del("./docs");
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
  var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/detailPage.html',
    '!./app/business.html',
     '!./app/business-hour.html',
     '!./app/art-dairy-see-more.html',
    '!./app/artist-trading-see-more.html',
    '!./app/paper-structure-see-more.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ]

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
  return gulp.src("./app/assets/images/**/*")
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger',['deleteDistFolder'], function(){

  gulp.start("usemin");
});

gulp.task('usemin', ['styles'], function() {
  return gulp.src(['./app/index.html','./app/detailPage.html',
    './app/business-hour.html','./app/art-dairy-see-more.html',
    './app/artist-trading-see-more.html','./app/paper-structure-see-more.html'])
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
     

    }))
    .pipe(gulp.dest("./docs"));
});

gulp.task('build', ['deleteDistFolder','copyGeneralFiles', 'optimizeImages', 'useminTrigger']);
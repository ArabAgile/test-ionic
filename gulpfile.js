var gulp = require('gulp'),
    gutil = require('gulp-util'),
    bower = require('bower'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    coffee = require('gulp-coffee'),
    jade = require('gulp-jade'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr(),
    sh = require('shelljs');

var sourcePaths = {
  sass: ['scss/**/*.scss'],
  coffee: ['www/_dev/coffee/*.coffee'],
  html: ['*.html', '**/*.html'],
  jade: ['*.jade']
};

gulp.task('sass', function(done) {
  gulp.src('scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('www/css/'))
    .on('end', done);
});

gulp.task('js', function() {
  // 
});

gulp.task('coffee', function() {
  gulp.src(sourcePaths.coffee)
    .pipe(coffee({bare: true})
      .on('error', gutil.log))
    .pipe(gulp.dest('www/js/'))
    ;
});

gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src(sourcePaths.jade)
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('www/templates/'))
});

gulp.task('default', ['sass', 'js', 'coffee', 'jade', 'watch']);

gulp.task('watch', function() {
  // Second: task name 'sass, js, ...'
  var server = livereload();
  gulp.watch(sourcePaths.sass, ['sass']);
  gulp.watch(sourcePaths.coffee, ['coffee']);
  gulp.watch(sourcePaths.html, function(e){
    server.changed(e.path);
  });
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

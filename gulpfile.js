//****************************************************************************************************
//
// .. VARIABLES
//
//****************************************************************************************************
var
  gulp = require('gulp'),
  ignore = require('gulp-ignore'),
  clean = require('gulp-clean'),
  haml = require('gulp-ruby-haml'),
  htmlreplace = require('gulp-html-replace'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  csscomb = require('gulp-csscomb'),
  cssmin = require('gulp-cssmin'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  connect = require('gulp-connect'),
  watch = require('gulp-watch');

var path = require('./path.json');



//****************************************************************************************************
//
// .. TASKS
//
//****************************************************************************************************
//
// .. Clean
//
gulp.task('clean', function() {
  return gulp.src(path.build, {read: false})
    .pipe(clean());
});

//
// .. Layouts
//
gulp.task('layouts:development/staging', function() {
  return gulp.src([path.layouts.all, path.layouts.views.nope])
    .pipe(haml({doubleQuote: true}))
    .pipe(gulp.dest(path.build));
});

gulp.task('layouts:production', ['layouts:development/staging'], function() {
  return gulp.src(path.layouts.build.all)
    .pipe(htmlreplace({javascripts: {src: path.javascripts.app, tpl: '<script src=\'%s\'></script>'}}))
    .pipe(gulp.dest(path.build));
});

//
// .. Stylesheets
//
gulp.task('stylesheets:development', function() {
  return gulp.src(path.stylesheets.app)
    .pipe(sass({noCache: true}))
    .pipe(gulp.dest(path.stylesheets.dest));
});

gulp.task('stylesheets:staging', ['stylesheets:development'], function() {
  return gulp.src(path.stylesheets.build.app)
    .pipe(autoprefixer('last 2 versions', 'ie 9'))
    .pipe(csscomb('zen'))
    .pipe(gulp.dest(path.stylesheets.dest));
});

gulp.task('stylesheets:production', ['stylesheets:staging'], function() {
  return gulp.src(path.stylesheets.build.app)
    .pipe(cssmin())
    .pipe(gulp.dest(path.stylesheets.dest));
});

//
// .. Javascripts
//
gulp.task('javascripts:staging', function() {
  return gulp.src([path.javascripts.all, path.javascripts.vendor.nope])
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('javascripts:production', ['javascripts:staging'], function() {
  return gulp.src(path.javascripts.list)
    .pipe(concat('application.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.javascripts.dest))
});

//
// .. Images
//
gulp.task('images', function() {
  gulp.src(path.images.all)
    .pipe(imagemin())
    .pipe(gulp.dest(path.images.dest));
});

//
// .. Copy
//
gulp.task('copy:stylesheets:vendor', function() {
  gulp.src(path.stylesheets.vendor.all)
    .pipe(gulp.dest(path.stylesheets.vendor.dest));
});

gulp.task('copy:javascripts', function() {
  gulp.src(path.javascripts.all)
    .pipe(gulp.dest(path.javascripts.dest));
});

gulp.task('copy:images', function() {
  gulp.src(path.images.all)
    .pipe(gulp.dest(path.images.dest));
});

gulp.task('copy:fonts', function() {
  gulp.src(path.fonts.all)
    .pipe(gulp.dest(path.fonts.dest));
});

gulp.task('copy:files', function() {
  gulp.src(path.files.list)
    .pipe(gulp.dest(path.build));
});

//
// .. Connect
//
gulp.task('connect', function() {
  connect.server({
    root: [path.build],
    port: 1111
  });
});

//
// .. Watch
//
gulp.task('watch', function() {
  gulp.src([path.layouts.all, path.layouts.views.nope], {read: false})
    .pipe(watch())
    .pipe(haml({doubleQuote: true}))
    .pipe(gulp.dest(path.build));
  gulp.watch(path.layouts.views.yep, ['layouts:development/staging']);
  gulp.watch(path.stylesheets.all, ['stylesheets:development']);
  gulp.watch(path.stylesheets.vendor.all, ['copy:stylesheets:vendor']);
  gulp.watch(path.javascripts.all, ['copy:javascripts']);
  gulp.watch(path.images.all, ['copy:images']);
  gulp.watch(path.files.list, ['copy:files']);
});



//****************************************************************************************************
//
// .. RUN
//
//****************************************************************************************************
gulp.task('default', ['connect', 'watch']);

//
// .. Development
//
gulp.task('dv', ['clean'], function() {
  gulp.start(
    'layouts:development/staging',
    'stylesheets:development',
    'copy:stylesheets:vendor',
    'copy:javascripts',
    'copy:images',
    'copy:fonts',
    'copy:files'
  );
});

//
// .. Staging
//
gulp.task('st', ['clean'], function() {
  gulp.start(
    'layouts:development/staging',
    'stylesheets:staging',
    'javascripts:staging',
    'images',
    'copy:stylesheets:vendor',
    'copy:javascripts',
    'copy:fonts',
    'copy:files'
  );
});

//
// .. Production
//
gulp.task('pr', ['clean'], function() {
  gulp.start(
    'layouts:production',
    'stylesheets:production',
    'javascripts:production',
    'images',
    'copy:fonts',
    'copy:files'
  );
});
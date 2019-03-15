var syntax = 'sass';
var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  ftp = require('vinyl-ftp'),
  notify = require('gulp-notify');

// Скрипты проекта

gulp.task('removedist', function(done) {
  del.sync('dist');
  return done();
});

gulp.task('clearcache', function() {
  return cache.clearAll();
});

// gulp.task('common-js', function() {
//   return gulp
//     .src(['app/js/common.js'])
//     .pipe(concat('common.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('app/js'));
// });

gulp.task('scripts', function(done) {
  gulp
    .src([
      'app/libs/jquery/dist/jquery.min.js',
      'app/libs/mmenu/js/jquery.mmenu.all.min.js',
      'app/libs/owl.carousel/owl.carousel.min.js',
      'app/libs/fotorama/fotorama.js',
      'app/libs/selectize/js/standalone/selectize.min.js',
      'app/libs/equalHeights/equalheights.js',
      'app/js/common.js', // Всегда в конце
    ])
    .pipe(concat('scripts.min.js'))
    // .pipe(uglify()) // Минимизировать весь js (на выбор)
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({ stream: true }));

  return done();
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app',
    },
    notify: false,
    // tunnel: true,
    // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
  });
});

gulp.task('sass', function(done) {
  gulp
    .src('app/' + syntax + '/**/*.' + syntax + '')
    .pipe(sass().on('error', notify.onError()))
    .pipe(rename({ suffix: '.min', prefix: '' }))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleanCSS())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ stream: true }));
  return done();
});

gulp.task('watch', function() {
  gulp.watch('app/' + syntax + '/**/*.' + syntax + '', gulp.parallel('sass'));
  gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
  gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('imagemin', function(done) {
  gulp
    .src('app/img/**/*')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/img'));
  return done();
});

gulp.task('build', function(done) {
  gulp.parallel('removedist', 'sass', 'imagemin', 'scripts');
  var buildFiles = gulp
    .src(['app/*.html', 'app/.htaccess'])
    .pipe(gulp.dest('dist'));

  var buildCss = gulp.src(['app/css/main.min.css']).pipe(gulp.dest('dist/css'));

  var buildJs = gulp.src(['app/js/scripts.min.js']).pipe(gulp.dest('dist/js'));

  var buildScript = gulp.src(['app/js/script.js']).pipe(gulp.dest('dist/js'));

  var buildFonts = gulp.src(['app/fonts/**/*']).pipe(gulp.dest('dist/fonts'));
  done();
});

gulp.task('deploy', function() {
  var conn = ftp.create({
    host: 'hostname.com',
    user: 'username',
    password: 'userpassword',
    parallel: 10,
    log: gutil.log,
  });

  var globs = ['dist/**', 'dist/.htaccess'];
  return gulp
    .src(globs, { buffer: false })
    .pipe(conn.dest('/path/to/folder/on/server'));
});

gulp.task('default', gulp.parallel('sass', 'scripts', 'browser-sync', 'watch'));

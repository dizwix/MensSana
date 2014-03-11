var gulp = require('gulp')
  , browserify = require('gulp-browserify')
  , uglify = require('gulp-uglify')
  , jade = require('gulp-jade')
  , minify = require('gulp-minify-css')

gulp.task('scripts', function(){
  return gulp.src('scripts/index.js')
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
})

gulp.task('styles', function(){
  return gulp.src('styles/**.css')
    .pipe(minify())
    .pipe(gulp.dest('dist/styles'))
})

gulp.task('images', function(){
  return gulp.src('images/**')
    .pipe(gulp.dest('dist/images'))
})

gulp.task('pages', function(){
  return gulp.src('pages/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', function(){
  gulp.watch('images/**', ['images'])
  gulp.watch('scripts/**', ['scripts'])
  gulp.watch('styles/**', ['styles'])
  gulp.watch('pages/**', ['pages'])
})

gulp.task('default', ['scripts', 'styles', 'images', 'pages'])
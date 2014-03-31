var gulp = require('gulp')
  , browserify = require('gulp-browserify')
  , uglify = require('gulp-uglify')
  , jade = require('gulp-jade')
  , minify = require('gulp-minify-css')
  , plumber = require('gulp-plumber')
  , stylus = require('gulp-stylus')
  , autoprefixer = require('gulp-autoprefixer')
  , fs = require('fs')
  , jadeLocals = JSON.parse(fs.readFileSync("./data/index.json"))

gulp.task('scripts', function(){
  return gulp.src('scripts/index.js')
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
})

gulp.task('styles', function(){
  return gulp.src('styles/**')
    .pipe(plumber())
    .pipe(stylus({
      set : [
        'include css'
      ]
    }))
    .pipe(autoprefixer())
    .pipe(minify())
    .pipe(gulp.dest('dist/styles'))
})

gulp.task('images', function(){
  return gulp.src('images/**')
    .pipe(gulp.dest('dist/images'))
})

gulp.task('pages', function(){
  return gulp.src('pages/**.jade')
    .pipe(plumber())
    .pipe(jade({
      locals : jadeLocals
    }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('watch', function(){
  gulp.watch('images/**', ['images'])
  gulp.watch('scripts/**', ['scripts'])
  gulp.watch('styles/**', ['styles'])
  gulp.watch('data/**', {}, function(){
    jadeLocals = JSON.parse(fs.readFileSync("./data/index.json"))
  })
  gulp.watch(['pages/**', 'partials/**', 'layouts/**'], ['pages'])
})

gulp.task('default', ['scripts', 'styles', 'images', 'pages'])
import gulp from 'gulp'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import browserSync from 'browser-sync'

const path = './src/*.js'
browserSync.create()

gulp.task('serve', ['js'], () => {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  })

  gulp.watch(path, ['js'])
  gulp.watch('./src/*.html').on('change', browserSync.reload)
})

gulp.task('js', () => {
  gulp.src(path)
    .pipe(babel())
    .pipe(gulp.dest('dist'))

  return gulp.src(path)
    .pipe(concat('onePage.min.js'))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
})

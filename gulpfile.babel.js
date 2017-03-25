import gulp from 'gulp'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import browserSync from 'browser-sync'
import gutil from 'gulp-util'

const path = './src/*.js'
browserSync.create()

gulp.task('serve', ['js'], () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })

  gulp.watch(path, ['js'])
  gulp.watch('./*.html').on('change', browserSync.reload)
})

gulp.task('js', () => {
  gulp.src(path)
    .pipe(babel().on('error', handleJSErrors))
    .pipe(gulp.dest('dist'))

  return gulp.src(path)
    .pipe(concat('onePage.min.js'))
    .pipe(babel().on('error', handleJSErrors))
    .pipe(uglify().on('error', handleJSErrors))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
})

function handleJSErrors (err) {
  gutil.log(gutil.colors.red(err))
  this.emit('end')
}

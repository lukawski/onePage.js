import gulp from 'gulp'
import babel from 'gulp-babel'
import concat from 'gulp-concat'
import uglify from 'gulp-uglify'
import browserSync from 'browser-sync'
import gutil from 'gulp-util'
import cleanCSS from 'gulp-clean-css'

const jsPath = './src/js/*.js'
const cssPath = './src/css/*.css'
browserSync.create()

gulp.task('serve', ['js', 'css'], () => {
  browserSync.init({
    server: {
      baseDir: './docs'
    }
  })

  gulp.watch(jsPath, ['js'])
  gulp.watch(cssPath, ['css'])
  gulp.watch('./docs/*.html').on('change', browserSync.reload)
})

gulp.task('js', () => {
  gulp.src(jsPath)
    .pipe(babel().on('error', handleJSErrors))
    .pipe(gulp.dest('dist'))

  gulp.src(jsPath)
    .pipe(concat('onePage.min.js'))
    .pipe(babel().on('error', handleJSErrors))
    .pipe(uglify().on('error', handleJSErrors))
    .pipe(gulp.dest('docs'))

  return gulp.src(jsPath)
    .pipe(concat('onePage.min.js'))
    .pipe(babel().on('error', handleJSErrors))
    .pipe(uglify().on('error', handleJSErrors))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
})

gulp.task('css', () => {
  gulp.src(cssPath)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'))

  gulp.src(cssPath)
    .pipe(concat('onePage.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('docs'))

  return gulp.src(cssPath)
    .pipe(concat('onePage.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
})

function handleJSErrors (err) {
  gutil.log(gutil.colors.red(err))
  this.emit('end')
}

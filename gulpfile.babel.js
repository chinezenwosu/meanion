import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import bower from 'gulp-bower';

const static_files = 'app/**/*.html';

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('public/lib'));
});

gulp.task('default', ['build', 'watch']);

gulp.task('move-static', () => {
  return gulp.src(static_files)
    .pipe(gulp.dest('public'));
});

gulp.task('transpile', () => {

  return browserify('app/src/app.js')
    .transform('babelify')
    .bundle()
    .on('error', function(error){
      console.error( '\nError: ', error.message, '\n');
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public'));
});

gulp.task('build', ['bower', 'transpile', 'move-static']);

gulp.task('watch', ['transpile'], () => {
  gulp.watch(['app/src/**/*', static_files], ['transpile', 'move-static']);
});
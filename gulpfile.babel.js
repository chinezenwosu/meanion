import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import bower from 'gulp-bower';

const CLIENT_ROOT = 'client';
const PUBLIC_ROOT = 'public';
const paths = {
  static_files: ['client/**/*.{html,css,png,gif,svg}'],
  entry: 'client/src/app.js',
  src: 'client/src/**/*',
  bower: 'public/lib'
};

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(paths.bower));
});

gulp.task('default', ['build']);

gulp.task('move-static', () => {
  return gulp.src(paths.static_files)
    .pipe(gulp.dest(PUBLIC_ROOT));
});

gulp.task('transpile', () => {

  return browserify(paths.entry)
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
  gulp.watch([paths.src, paths.static_files], ['build']);
});
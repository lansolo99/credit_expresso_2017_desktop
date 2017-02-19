// REQUIREMENTS

var gulp = require ('gulp');
var sass = require ('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var del = require('del');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var runSequence = require('run-sequence');

//////////////////////////////////////////////

// TESTING

gulp.task('hello', function() {
  console.log('Hello');
});


// DEL

gulp.task('clean:dist', function() {
  return del.sync('dist');
})


// SASS + Autoprefixer

gulp.task('sass', function(){

  return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss /scss dir
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
      .pipe(autoprefixer({
        cascade: true,
        remove: false,
        browsers: ['last 2 versions', 'safari 5', 'opera 12.1', 'iOS 7', 'iOS 6', 'last 3 iOS versions', 'android 4']
      }))
      .pipe(gulp.dest('src/css/')) // Outputs it in the css folder
      .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }))
});


// BROWSER-SYNC

gulp.task('browserSync',function(){

  browserSync.init({
    server: {
          baseDir: "./"
      }
  });

});



// WATCHERS
gulp.task('watch', ['sass'],  function(done) {
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
  done();
})



// HTML copy

gulp.task('htmlCopy', function() {
  return gulp.src('src/*.html')
  .pipe(gulp.dest('dist/'))
})

// CSS copy

gulp.task('cssCopy', function() {
  return gulp.src('src/css/*')
  .pipe(gulp.dest('dist/css'))
})


// Img Copy

gulp.task('imgCopy', function() {
  return gulp.src('src/img/*')
  .pipe(gulp.dest('dist/img'))
})


// SG assets copy

gulp.task('sgAssets', function() {
  return gulp.src('src/Vente flash Expresso_files/*.{css,gif,js,jpg,png}')
  .pipe(gulp.dest('dist/Vente flash Expresso_files'))
})


// Minimify css

gulp.task('minify-css', function() {
  return gulp.src('src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('src/css/'));
});


// BUILD TASK

gulp.task('build', function(callback) {
  runSequence('clean:dist','sass','minify-css','cssCopy','imgCopy','sgAssets','htmlCopy', callback)
})


// DEFAULT DEV TASK

gulp.task('default', function(callback) {
  runSequence('sass','browserSync', 'watch',
    callback
  );
});

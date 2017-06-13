var gulp 		= require('gulp');
var uglify 		= require('gulp-uglify');
var cleanCSS 	= require('gulp-clean-css');
var concat 		= require('gulp-concat');
var browserSync = require('browser-sync').create();

gulp.task('scripts', function(){
    return gulp.src('assets/js/*.js')
	.pipe(concat('bundle.min.js'))
    .pipe(uglify().on('error', function(e){
            console.log(e);
         }))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function(){
	return gulp.src(['./assets/css/*'])
	.pipe(concat('bundle.min.css'))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest('dist/css'))
});

gulp.task('js-watch', ['scripts'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('hello', function() {
  console.log('Pingot Ganteng');
});

gulp.task('watch', function(){
	gulp.watch(['assets/**/*.js','assets/**/*.css','index.html'],['scripts','css'])
});

// use default task to launch Browsersync and watch JS files
gulp.task('default', ['scripts','css'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    // add browserSync.reload to the tasks array to make
    // all browsers reload after tasks are complete.
    gulp.watch(['assets/**/*.js','assets/**/*.css'], ['js-watch','css']);
    gulp.watch("*.html").on('change', browserSync.reload);
});
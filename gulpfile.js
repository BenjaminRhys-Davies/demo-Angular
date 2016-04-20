var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('connect', function () {
    connect.server({
        root: 'public',
        port: 4000
    });
});

gulp.task('sass', function() {
    return sass('sass/style.scss')
        .pipe(gulp.dest('public/css'));
});

gulp.task('browserify', function () {
    // Grabs the app.js file
    return browserify('./app/app.js')
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function () {
    gulp.watch('app/**/*.js', ['browserify']);
    gulp.watch('sass/style.scss', ['sass']);
});

gulp.task('default', ['connect', 'watch']);

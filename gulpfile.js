var gulp = require('gulp');
var webpack = require('gulp-webpack');
var concat = require('gulp-concat');
var webpackConf = require('./webpack.config.js');

gulp.task("webpack", function() {
    return gulp.src('src/js/main.js')
        .pipe(webpack( webpackConf ))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function() {
    gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
});

gulp.task('default',['webpack', 'copy']);

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['default']);
});
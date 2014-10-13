var gulp = require('gulp');
var webpack = require('gulp-webpack');
var concat = require('gulp-concat');
var less = require('gulp-less');
var webpackConf = require('./webpack.config.js');

gulp.task("webpack", function() {
    return gulp.src('src/js/main.js')
        .pipe(webpack( webpackConf ))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build-less', function(){
    return gulp.src('./src/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy', function() {
    gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
    
    gulp.src('src/css/*.*')
      .pipe(gulp.dest('./dist/css'));
    
    gulp.src('src/font/*.*')
      .pipe(gulp.dest('./dist/font'));
});

gulp.task('default', ['build-less', 'webpack', 'copy']);

gulp.task('watch', function() {
    gulp.watch('src/**/*.*', ['default']);
});
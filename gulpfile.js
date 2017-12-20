var gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    image = require('gulp-imagemin'),
    sass = require('gulp-ruby-sass'),
    ugly = require('gulp-uglify');

gulp.task('imagemin', () => {
    gulp.src('src/images/**/*')
        .pipe(image())
        .pipe(gulp.dest('build/images'))
});

gulp.task('sass', () => {
    sass('src/styles/style.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('public/'));
});

gulp.task('build-js', () => {
    return gulp.src('src/scripts/*.js')
        .pipe(concat('client.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(ugly())
        .on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('public/'));
});

gulp.task('build-routes', () => {
    return gulp.src('src/routes/**/*.js')
        .pipe(concat('routes.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(ugly())
        .on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('public/'));
});

gulp.watch('src/styles/style.scss', ['sass']);


gulp.task('default', ['sass', 'build-js', 'build-routes']);
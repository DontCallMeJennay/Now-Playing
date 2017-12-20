var gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    image = require('gulp-imagemin'),
    sass = require('gulp-ruby-sass'),
    vueify = require('gulp-vueify2'),
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

gulp.task('vueify', () => {
    return gulp.src('src/components/*.js')
        .pipe(concat('vue-components.js'))
        .pipe(gulp.dest('src/scripts/'));
});

gulp.task('build-js', ['vueify'], () => {
    return gulp.src('src/scripts/vue-components.js')
            gulp.src('src/scripts/*.js')
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
gulp.watch('src/scripts/*.js', ['build-js']);


gulp.task('default', ['sass', 'build-js', 'build-routes']);
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
    sass('src/stylesheets/style.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('build/stylesheets/'));
});

gulp.task('build-js', () => {
    return gulp.src('src/scripts/**/*.js')
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(ugly())
        .on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('build/scripts'));
});

gulp.task('build-routes', () => {
    return gulp.src('src/routes/**/*.js')
        .pipe(concat('index.js'))
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(ugly())
        .on('error', function(err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('build/routes/'));
});

gulp.watch('src/stylesheets/*', ['sass']);
gulp.watch('src/images/*', ['imagemin']);
gulp.watch('src/scripts/**/*', ['build-js'])


gulp.task('default', ['sass', 'imagemin', 'build-js', 'build-routes']);
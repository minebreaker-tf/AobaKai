const gulp = require('gulp');
const ts = require('gulp-typescript');
const rimraf = require('rimraf');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');

// const base = 'AobaKai/public/';
const base = 'web/';

gulp.task('clean', function (callback) {
    return rimraf('./public', callback);
});

gulp.task('compile', function () {
    const tsProject = ts.createProject('tsconfig.json');

    //noinspection JSUnresolvedFunction
    return tsProject.src()
        .pipe(tsProject())
        .on("error", function () {
            this.failed = true;
        })
        .on("finish", function () {
            this.failed && process.exit(1);
        })
        .js
        .pipe(replace('${BASE_URL}', base))
        .pipe(gulp.dest('./build/ts/'));
});

gulp.task('webpack', ['compile'], function () {
    return gulp.src('./build/ts/index.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(rename('index.js'))
        .pipe(gulp.dest('./build/'))
});

gulp.task('minify-js', ['webpack'], function () {
    return gulp.src('./build/index.js')
        .pipe(uglify())
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('minify-css', [], function () {
    return gulp.src('src/ts/*.css')
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./build/'));
});

gulp.task('copy', ['minify-js', 'minify-css'], function () {
    gulp.src('src/ts/index.html')
        .pipe(replace('index.js', base + 'index.min.js'))
        .pipe(replace('index.css', base + 'index.min.css'))
        .pipe(gulp.dest('./public/'));
    gulp.src(['build/index.min.css', 'build/index-dark.min.css'])
        .pipe(gulp.dest('./public/'));
    gulp.src('build/index.min.js')
        .pipe(replace('index.css', 'index.min.css'))
        .pipe(replace('index-dark.css', 'index-dark.min.css'))
        .pipe(gulp.dest('./public/'));
});

gulp.task('build', ['compile', 'webpack', 'minify-js', 'minify-css', 'copy']);

gulp.task('default', ['build']);

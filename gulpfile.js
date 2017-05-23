const gulp = require('gulp');
const ts = require('gulp-typescript');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const rimraf = require('rimraf');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

const base = 'AobaKai/public/';
// const base = 'web/';

gulp.task('clean', function (callback) {
    return rimraf('./public', callback);
});

gulp.task('env', function () {
    process.env.NODE_ENV = '"production"';
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

gulp.task('browserify', ['compile'], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: [
            './build/ts/index.js'
        ],
        noParse: [],
        cache: {},
        packageCache: {}
    })
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('minify-js', ['browserify'], function () {
    return gulp.src('./build/index.js')
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
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

gulp.task('copy-dev', ['browserify'], function () {
    gulp.src('src/ts/index.html')
        .pipe(replace('index.js', base + 'index.js'))
        .pipe(replace('index.css', base + 'index.css'))
        .pipe(gulp.dest('./public/'));
    gulp.src('build/index.js')
        .pipe(replace('index.css', 'index.min.css'))
        .pipe(replace('index-dark.css', 'index-dark.min.css'))
        .pipe(gulp.dest('./public/'));
    gulp.src(['src/ts/index.css', 'src/ts/index-dark.css', 'build/index.js'])
        .pipe(gulp.dest('./public/'));
    gulp.src('content/*')
        .pipe(gulp.dest('./public/content'));
    gulp.src('content/subdir/*')
        .pipe(gulp.dest('./public/content/subdir'));
});

gulp.task('copy-prod', ['minify-js', 'minify-css'], function () {
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

gulp.task('dev-build', ['compile', 'browserify', 'copy-dev']);

gulp.task('build', ['env', 'compile', 'browserify', 'minify-js', 'minify-css', 'copy-prod']);

gulp.task('default', ['build']);

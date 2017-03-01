const gulp = require('gulp');
const ts = require('gulp-typescript');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
var rimraf = require('rimraf');

gulp.task('clean', function (callback) {
    return rimraf('./public', callback);
});

gulp.task('env', function () {
    // process.env.NODE_ENV = 'production'; // Vueはminifyしないとだめらしい
});

gulp.task('copy', function () {
    gulp.src(['src/ts/index.html', 'src/ts/index.css'])
        .pipe(gulp.dest('./public/'));
    gulp.src('content/*')
        .pipe(gulp.dest('./public/content'));
    gulp.src('content/subdir/*')
        .pipe(gulp.dest('./public/content/subdir'));
});

gulp.task('compile', ['env'], function () {
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
        .pipe(gulp.dest('./public/'));
});

gulp.task('build', ['env', 'compile', 'browserify', 'copy']);

gulp.task('default', ['build']);

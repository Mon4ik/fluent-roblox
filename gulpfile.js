const {series, src, watch, dest, parallel} = require('gulp');
const gulpClean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const serve = require('gulp-serve');
const sass = require("gulp-sass")(require("sass"))

function clean(cb) {
    return src("dist", {read: false, allowEmpty: true})
        .pipe(gulpClean())
}

function build(cb) {
    return src("scss/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("dist"))
}

exports.build = build;
exports.default = series(clean, build);

exports.watch = function () {
    watch('./scss/', build)
    return serve({root: "dist", port: 9999, hostname: "0.0.0.0"})()
};
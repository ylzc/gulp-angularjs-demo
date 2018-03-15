var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var babel = require("gulp-babel");
var dirSync = require('gulp-directory-sync');
var clean = require('gulp-clean');
var gutil = require("gulp-util");
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var src = "src/main/www/";
var output = "src/main/resources/static/";
var paths = {
    src:src,
    output:output,
    sass: [
        src+'scss/**/*.scss',
    ],
    plugin:[
        src+'plugin/**'
    ],
    html:[
        '!'+src+'/plugin/**',
        src+'**/*.html',
        src+'*.html'
    ],
    js:[
        "!"+src+"/plugin/**",
        src+"*.js",
        src+"**/*.js"
    ],
    images:[
        src+"images/**"
    ]
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
    gulp.src(paths.sass)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.output+'css/'))
        .pipe(gulp.dest(paths.src+'css/'))
        .pipe(cleanCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(paths.output+'css/'))
        .pipe(gulp.dest(paths.src+'css/'))
        .on('end',done)
});

gulp.task('watch', ['sass', "syncLib","syncJS","syncTP","syncIMG"], function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch([paths.js], ['syncJS']);
    gulp.watch(paths.plugin,['syncLib']);
    gulp.watch([paths.html], ['syncTP']);
    gulp.watch([paths.images], ['syncIMG']);
});


gulp.task('syncIMG', function (done) {
    return gulp.src("")
        .pipe(dirSync(paths.src+"images", paths.output+"images", {printSummary: true, nodelete: false}))
});

gulp.task("syncJS", function (done) {
    gulp.src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on('error', errConsole)
        .pipe(uglify())
        .on('error', errConsole)
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(paths.output))
        .on('end',done)

});

gulp.task("syncTP", function (done) {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
        minifyJS: false,//压缩页面JS
        minifyCSS: false//压缩页面CSS
    };
    gulp.src(paths.html)
        .pipe(htmlmin(options))
        .pipe(gulp.dest(paths.output))
        .on('end',done)
});

gulp.task("syncLib", function (done) {
    gulp.src("")
        .pipe(dirSync(paths.src+"plugin", paths.output+"plugin", {printSummary: true, nodelete: false}))
        .on('end',done)
});

gulp.task("cleanHtml", function () {
    return gulp.src(paths.output+"partials", {read: false})
        .pipe(clean());
});

gulp.task('htmlmin', ['cleanHtml'], function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
        minifyJS: false,//压缩页面JS
        minifyCSS: false//压缩页面CSS
    };
    gulp.src(paths.html)
        .pipe(htmlmin(options))
        .pipe(gulp.dest(paths.output+"partials"))
});

gulp.task("cleanJs", function () {
    return gulp.src(paths.output+"script", {read: false})
        .pipe(clean());
})

gulp.task("jsmin", ['cleanJs'], function () {
    gulp.src(paths.js)
        .pipe(babel())
        .on('error', errConsole)
        // .pipe(ngAnnotate({single_quotes: true}))
        // .on('error', errConsole)
        .pipe(uglify())
        .on('error', errConsole)
        .pipe(gulp.dest(paths.output+"script"))
})

function errConsole(err) {
    gutil.log(err);
    this.emit('end');
}

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-minify-css');
var htmlmin = require('gulp-minify-html');
var concat = require("gulp-concat");
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jshint = require("gulp-jshint");

gulp.task('sass', function () {
    gulp.src('css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dest/css'));
    //    gulp.watch('css/css.scss', ['sass']);
})

gulp.task('jsmin', function () {
    gulp.src(['js/*.js', '!js/*.min.js']) //获取文件，同时过滤掉.min.js文件
        .pipe(uglify())
        .pipe(gulp.dest('dest/js')); //输出文件
});

gulp.task('cssmin', function () {
    gulp.src(['dest/css/*.css', '!dest/css/*.min.css']) //要压缩的css
        .pipe(cssmin())
        .pipe(gulp.dest('dest/cssmin'));
});

gulp.task('htmlmin', function () {
    gulp.src('*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('dist'));
});

gulp.task('concat', function () {
    gulp.src(['dest/js/*.js', '!dest/js/*.min.js']) //要合并的文件
        .pipe(concat('all.js')) // 合并匹配到的js文件并命名为 "all.js"
        .pipe(gulp.dest('dist/js'));
});

gulp.task('imagemin', function () {
    return gulp.src('img/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()] //使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('jslint', function () {
    gulp.src(['js/*.js', '!js/*.min.js'])
        .pipe(jshint())
        .pipe(jshint.reporter()); // 输出检查结果
});

gulp.task('default', ['sass', 'jsmin', 'cssmin', 'htmlmin', 'concat', 'imagemin', 'jslint']);

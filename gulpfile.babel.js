var gulp = require('gulp');
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var pug = require('gulp-pug');
var browserSync = require("browser-sync");
// javascriptの圧縮
var uglify = require('gulp-uglify')
// 複数のJSファイルを一つにまとめる
var concat = require("gulp-concat")

import babelify from 'babelify'
import browserify from 'browserify'
import buffer from 'vinyl-buffer'
import source from 'vinyl-source-stream'
import sourcemaps from 'gulp-sourcemaps'

var fontAwesome = require('node-font-awesome');

//setting : paths
var paths = {
  'scss': './src/sass/',
  'css': './dist/css/',
  'pug': './src/pug/',
  'html': './dist/',
  'js': './src/js/',
  'destJs': './dist/js/',
  'img': './src/img/',
  'distImg': './dist/img/',
  'destAwesome': './dist/css/fonts/',
}
//setting : Sass Options
var sassOptions = {
  outputStyle: 'compressed',
  includePaths: [fontAwesome.scssPath],
}
//setting : Pug Options
var pugOptions = {
  pretty: true
}

//Sass
gulp.task('fonts', copyFontAwesomeFonts);

function copyFontAwesomeFonts() {
  gulp.src(fontAwesome.fonts)
    .pipe(gulp.dest(paths.destAwesome));
}

gulp.task('scss', ['fonts'], function () {
  gulp.src(paths.scss + '/base.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass(sassOptions))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.css))
});

// JavaScript
gulp.task('javascript_old', function () {
  gulp.src(paths.js + '**/*.js')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))

    // JSの圧縮
    .pipe(uglify()).on('error', function (e) {
      console.log(e);
    })
    // 全てのJSファイルをscriptファイル一つにまとめる。
    .pipe(concat('script.js'))
    .pipe(gulp.dest(paths.destJs))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('javascript', () => {
  browserify({
      entries: 'src/js/main.js',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .on('error', err => console.log('Error : ' + err.message))
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.destJs))
    .pipe(browserSync.reload({
      stream: true
    }))
})

//Pug
gulp.task('pug', () => {
  return gulp.src([paths.pug + '**/*.pug', '!' + paths.pug + '**/_*.pug'])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(paths.html));
});

//Browser Sync
gulp.task('browser-sync', () => {
  browserSync({
    port: 8888,
    server: {
      baseDir: paths.html
    }
  });
  gulp.watch(paths.destJs + "**/*.js", ['reload']);
  gulp.watch(paths.html + "**/*.html", ['reload']);
  gulp.watch(paths.css + "**/*.css", ['reload']);
});
gulp.task('reload', () => {
  browserSync.reload();
});

//watch
gulp.task('watch', function () {
  gulp.watch(paths.scss + '**/*.scss', {
    interval: 1000,
    usePolling: true
  }, ['scss']);
  gulp.watch(paths.img + '**/*.png', ['copy-img']);
  gulp.watch(paths.js + '**/*.js', {
    interval: 1000,
    usePolling: true
  }, ['javascript']);
  gulp.watch([paths.pug + '**/*.pug', '!' + paths.pug + '**/_*.pug'], {
    interval: 1000,
    usePolling: true
  }, ['pug']);
});

gulp.task('copy-img', function () {
  gulp.src(paths.img + '**/*')
    .pipe(gulp.dest(paths.distImg))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('build', ['scss', 'pug', 'copy-img', 'javascript']);

gulp.task('default', ['scss', 'browser-sync', 'pug', 'watch', 'copy-img', 'javascript']);
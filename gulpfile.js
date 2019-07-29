"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const changedInPlace = require('gulp-changed-in-place');
const sourcemaps = require("gulp-sourcemaps");
const babel = require('gulp-babel');
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
sass.compiler = require("node-sass");


gulp.task("styles", function() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(changedInPlace("assets"))
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss())
    .pipe(gulp.dest("./assets"));
});

gulp.task("includes", function() {
  return gulp
    .src("./src/scss/**/**/*.scss")
    .pipe(changedInPlace("assets"))
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss())
    .pipe(gulp.dest("./assets"));
});

gulp.task("styles-base", function() {
  return gulp
    .src("./src/scss/base/*.scss")
    .pipe(changedInPlace("assets"))
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss())
    .pipe(gulp.dest("./assets"));
});

gulp.task("scripts", function() {
  return gulp.src("./src/js/*.js")
    .pipe(changedInPlace("assets", { howToDetermineDifference: "modification-time" }))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./assets/"))
});

gulp.task("scripts-default", function() {
  return gulp.src([
    "./src/js/defaults/match-media.js",
    "./src/js/defaults/lazysizes.js",
    "./src/js/defaults/vendor.js",
    "./src/js/defaults/theme.js",
    "./src/js/defaults/password.js"
  ])
  .pipe(concat("gm.base.min.js"))
  .pipe(uglify())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sourcemaps.write("./"))
  .pipe(gulp.dest("./assets/"))
});

gulp.task("optimize-images", function() {
  return gulp.src("./src/img/*.{jpg,jpeg,png,svg}")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ], {
        verbose: true
      }))
    .pipe(gulp.dest("./assets/"));
});

gulp.task("convert-webp", function() {
  return gulp.src("./src/img/*.{jpg,jpeg,png}")
    .pipe(webp())
    .pipe(gulp.dest("./assets/"));
});

gulp.task("watch", function() {
  gulp.watch("./src/img/*", gulp.series("optimize-images", "convert-webp"));
  gulp.watch("./src/js/*.js", gulp.series("scripts"));
  gulp.watch("./src/js/defaults/*.js", gulp.series("scripts-default"));
  gulp.watch("./src/scss/*.scss", gulp.series("styles"));
  gulp.watch("./src/scss/base/*.scss", gulp.series("styles-base"));
  //gulp.watch("./src/scss/**/**/*.scss", gulp.series("includes"));
});

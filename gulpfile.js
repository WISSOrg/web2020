const fs = require('fs');
const gulp = require("gulp");
const copy = require("gulp-copy");
const data = require('gulp-data');
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const yaml = require("js-yaml")

const menu_data_path = "src/data/menu.yml";
const organizing_committee_data_path = "src/data/organizing-committee.yml"

gulp.task('pug', function(done) {
    gulp.src("src/*.pug")
        .pipe(data(function(file) {
            yaml_menu_data = yaml.load(fs.readFileSync(menu_data_path));
            yaml_organizing_committee_data = yaml.load(fs.readFileSync(organizing_committee_data_path));
            return {
                menu_data: yaml_menu_data,
                organizing_committee_data: yaml_organizing_committee_data
            };
        }))
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest("dst"));
    done();
});

gulp.task('sass', function(done) {
    gulp.src("src/sass/*.sass")
        .pipe(sass())
        .pipe(gulp.dest("dst/css"));
    done();
});

gulp.task('copy', function(done) {
    gulp.src("src/downloads/**/*")
        .pipe(gulp.dest("dst/downloads"));
    gulp.src("src/assets/**/*")
        .pipe(gulp.dest("dst/assets"));
    gulp.src("src/assets/originals/**/*")
        .pipe(gulp.dest("dst/assets/thumbnails"));
    done();
});

gulp.task('default', gulp.parallel('pug', 'sass', 'copy'));

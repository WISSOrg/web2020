const fs = require('fs');
const gulp = require("gulp");
const copy = require("gulp-copy");
const data = require('gulp-data');
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const yaml = require("js-yaml")
const csvParse = require('csv-parse/lib/sync');
const sharp = require("sharp");
const glob = require("glob");

const menu_data_path = "src/data/menu.yml";
const organizing_committee_data_path = "src/data/organizing-committee.yml"
const program_committee_data_path = "src/data/program-committee.csv"

gulp.task('asset-processing', function(done) {
    fs.mkdirSync("dst/assets/committee", { recursive: true });
    var files = glob.sync("src/assets/committee/*.*");
    files.forEach(function(file) {
        var name = file.substring(file.lastIndexOf('/') + 1).replace(".jpg", "").replace(".png", "");
        sharp(file)
            .resize({ width: 480, height: 480, fit: "cover" })
            .jpeg({ quality: 80 })
            .toFile("dst/assets/committee/" + name + ".jpg");
    });

    gulp.src("src/assets/originals/**/*")
        .pipe(gulp.dest("dst/assets/thumbnails"));

    gulp.src("src/assets/originals/**/*")
        .pipe(gulp.dest("dst/assets/originals"));

    done();
});

gulp.task('pug', function(done) {
    gulp.src("src/*.pug")
        .pipe(data(function(file) {
            // Read YAML files
            yaml_menu_data = yaml.load(fs.readFileSync(menu_data_path));
            yaml_organizing_committee_data = yaml.load(fs.readFileSync(organizing_committee_data_path));

            // Read CSV files
            csv_program_committee_data = csvParse(fs.readFileSync(program_committee_data_path), {columns: true});

            return {
                menu_data: yaml_menu_data,
                organizing_committee_data: yaml_organizing_committee_data,
                program_committee_data: csv_program_committee_data
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
    done();
});

gulp.task('default', gulp.parallel('asset-processing', 'pug', 'sass', 'copy'));

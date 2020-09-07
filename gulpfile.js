const gulp = require("gulp");
const pug = require("gulp-pug");
const copy = require("gulp-copy");
const sass = require("gulp-sass");

gulp.task('pug', function(done) {
    gulp.src("src/*.pug")
        .pipe(pug({pretty: true}))
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

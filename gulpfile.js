const gulp = require("gulp");
const pug = require("gulp-pug");
const copy = require("gulp-copy");

gulp.task('pug', function(done) {
    gulp.src("src/*.pug")
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest("dst"));
    done();
});

gulp.task('copy', function(done) {
    gulp.src("src/downloads/**/*")
    .pipe(gulp.dest("dst/downloads"));
    done();
});

gulp.task('default', gulp.series('pug', 'copy'));

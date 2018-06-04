const gulp = require("gulp");
const gts = require("gulp-typescript");
const tsProject = gts.createProject("tsconfig.json");
const rimraf = require("rimraf");

gulp.task("clean", () => {
  rimraf.sync("./yarn-error.log");
  rimraf.sync("./dist");
});

gulp.task("build", ["clean"], () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"));
});

var del         = require('del');
var gulp        = require('gulp');
var replace     = require('gulp-string-replace');
var runSequence = require('run-sequence');
var vfs         = require('vinyl-fs');
var vinylPaths  = require('vinyl-paths');

var buildsPath      = './builds';
var buildPath       = './build';
var timestamp       = new Date().getTime();
var buildFolderName = 'build' + timestamp;
var fullPath        = buildsPath.concat('/', buildFolderName);

const prodTask = (callback) => {
    return runSequence(
        'replace-timestamp',
        'remove-symlinks',
        'link-build',
        callback
    );
}

const replaceTimestamp = () => {
    return gulp.src('./src/index.html')
        .pipe(replace('{%timestamp%}', timestamp))
        .pipe(gulp.dest(fullPath));
}

const removeSymlinks = () => {
    return gulp.src(buildPath.concat('/*'))
        .pipe(vinylPaths(del)); 
}

const linkBuild = () => {
    return vfs.src(fullPath.concat('/*'), {followSymlinks: false})
        .pipe(vfs.symlink(buildPath, {relativeSymlinks: true}));
}

gulp.task('link-build', linkBuild);
gulp.task('remove-symlinks', removeSymlinks);
gulp.task('replace-timestamp', replaceTimestamp);
gulp.task('prod', prodTask);

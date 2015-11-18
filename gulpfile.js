/**
 * Created by plysiu on 18.11.15.
 */
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');


gulp.task('default', function() {
    var watcher = gulp.watch('./*.js');
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + '.');
    });
    gulp.run('run');
});

gulp.task('run',function(){
    nodemon({ script: 'index.js' })
        .on('restart', function () {
            console.log('restarted!')
        });
});
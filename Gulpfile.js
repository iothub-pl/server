'use strict';
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var shell = require('gulp-shell')

gulp.task('default', function() {
    var watcher = gulp.watch('./*.js');
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + '.');
    });
    gulp.run('run');
});

gulp.task('serve',function(){
    nodemon({ script: 'index.js' })
        .on('restart', function () {
            console.log('Server restarted!')
        });
});

gulp.task('test',function(){
   gulp.src('test.js').pipe( mocha({reporter: 'nyan'}));
});

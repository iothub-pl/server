'use strict';
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var     apidoc = require('gulp-apidoc');

/**
 *
 */
gulp.task('default', function () {
    var watcher = gulp.watch('./**.js');
    watcher.on('change', function (event) {
        console.log('File ' + event.path + ' was ' + event.type + '.');
    });
    gulp.run('serve');

});
/**
 *
 */
gulp.task('serve', function () {
    console.log('Server restarted.');
    nodemon({
        script: 'index.js',
        execMap: {
            js: 'node --harmony'
        },
    })
        .on('restart', function () {
            console.log('Server restarted!')
        });
});

gulp.task('test', function () {
    gulp.src('./mvc/**/*test.js').pipe(mocha());
});


gulp.task('apidoc', function(done){
    apidoc({
        src: './mvc/**/controller.js',
        dest: './apidoc/',
        debug: true,

    },done);
});

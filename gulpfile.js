const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gulpMocha = require('gulp-mocha')

gulp.task('default', function() {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore:['./node_modules/**']
    }).on('restart', function() {
        console.log('Restarting the server');
    })
})

gulp.task('test', function() {
    gulp.src('__tests__/*.js', {read: false}).pipe(gulpMocha({reporter: 'nyan'}))
})
const gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify'),
    browserSync = require('browser-sync')

const dist_dir = 'dist'
const pug_dir = 'src/pug'
const sass_dir = 'src/sass'
const js_dir = 'src/js'

let tasks 

if(process.env.NODE_ENV == 'production')
{
    tasks = ['pug-compiler', 'sass-compiler', 'minify]
}else 
{
    tasks = ['browser-sync', 'watch']
}

// pug compiler
gulp.task('pug-compiler', function(){
    gulp.src(pug_dir + '/*.pug')
        .pipe(pug({pretty: true, includePaths: pug_dir}))
        .pipe(gulp.dest(dist_dir))
})

// sass compiler
gulp.task('sass-compiler', function(){
    gulp.src(sass_dir + '/*.sass')
        .pipe(sass({
            includePaths: sass_dir,
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest(dist_dir + '/css'))
        .pipe(browserSync.reload({stream: true}))
})

//javascript minify
gulp.task('minify', function(){
    gulp.src(js_dir + '/*.js')
        .pipe(minify({
            min:'.js'
        }))
        .pipe(gulp.dest(dist_dir + '/js'))
});

// watch
gulp.task('watch', function(){
    gulp.watch(pug_dir + '/**', ['pug-compiler'])
    gulp.watch(sass_dir + '/**', ['sass-compiler'])
    gulp.watch(js_dir + '/**', ['minify'])
})

// browser sync
gulp.task('browser-sync', ['sass-compiler','pug-compiler', 'minify'], function(){
    browserSync({
        server: {
            baseDir: dist_dir
        },
        notify: true
    })
})

gulp.task('default', tasks)

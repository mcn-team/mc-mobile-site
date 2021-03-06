'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const historyApiFallback = require('connect-history-api-fallback');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const _ = require('lodash');
const inject = require('gulp-inject');
const rimraf = require('rimraf');
const del = require('del');

const JS_FILES = [
    'client/app/**/*.js'
];
const JSX_FILES = [
    'client/app/**/*.jsx'
];
const CSS_FILES = [
    'node_modules/bulma/css/bulma.css',
    'node_modules/font-awesome/css/font-awesome.css',
    'client/style.css'
];

const FONTS_FILES = [
    'node_modules/font-awesome/fonts/*.*'
];

const BUNDLE_FILES = [
    'client/dist/bundle.js',
    'client/dist/style.css'

];
const LIB_FILES = [
    'node_modules/js-md5/build/md5.min.js',
    'node_modules/quagga/dist/quagga.min.js',
    'node_modules/jsencrypt/bin/jsencrypt.min.js'
];
const ASSETS_FILES = [
    'client/app/assets/**/*.*'
];

gulp.task('assets', [], () => {
    return gulp.src(ASSETS_FILES)
        .pipe(gulp.dest('client/dist/'));
});

gulp.task('libs', ['styles'], () => {
    return gulp.src(LIB_FILES)
        .pipe(gulp.dest('client/dist/libs/'));
});

gulp.task('fonts', [], () => {
    return gulp.src(FONTS_FILES)
        .pipe(gulp.dest('client/dist/fonts/'));
});

gulp.task('styles', ['assets', 'fonts'], () => {
    return gulp.src(CSS_FILES)
        .pipe(gulp.dest('client/dist/css/'));
});

gulp.task('bundle', ['libs'], () => {
    return gulp.src('./entry.js')
        .pipe(webpackStream(require('./webpack.config.js'), webpack))
        .pipe(gulp.dest('client/dist/'));
});

gulp.task('browsersync', ['bundle'], () => {
    browserSync.init({
        server: {
            baseDir: './client',
            // A middleware is needed to handle reloading the pages
            // if the client router uses push state instead of hash system
            // http://localhost:8080/home (push state)
            // http://localhost:8080/#/home (hash system)
            middleware: [ historyApiFallback() ]
        },
        port: 4141,
        open: false
    });

    gulp.watch(BUNDLE_FILES, reload);
});

gulp.task('watch', ['browsersync'], () => {
    gulp.watch(_.union(JS_FILES, JSX_FILES), ['bundle']);
    gulp.watch(CSS_FILES, ['styles']);
});

gulp.task('serve', ['clean', 'watch']);

gulp.task('clean', () => {
    return del.sync('./client/dist/');
});

gulp.task('build', ['clean','bundle']);

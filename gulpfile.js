'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const historyApiFallback = require('connect-history-api-fallback');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const _ = require('lodash');

const JS_FILES = [];
const JSX_FILES = [];
const CSS_FILES = [];

const BUNDLE_FILE = [
    'client/dist/bundle.js'
];

gulp.task('bundle', () => {
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
        port: 3000,
        open: false
    });

    gulp.watch(BUNDLE_FILE, reload);
});

gulp.task('watch', ['browsersync'], () => {
    gulp.watch(_.union(JS_FILES, JSX_FILES), ['bundle']);
});

gulp.task('serve', ['watch']);

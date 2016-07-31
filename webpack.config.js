'use strict';

const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'client/dist');
const APP_DIR = path.resolve(__dirname, 'client/app');

const config = {
    entry: APP_DIR + '/index.jsx',
    devtool: 'source-map',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test:/\.jsx?/,
                include: APP_DIR,
                loader: 'babel'
            }
        ]
    },
    // Allow webpack to resolve filename with or
    // without extension in es6 module importation
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};

exports = module.exports = config;

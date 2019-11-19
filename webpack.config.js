'use strict';

const nodeExternals = require('webpack-node-externals');
const path = require('path');

const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'none',
    entry: {
        index: './index.ts'
    },
    target: 'node',
    output: {
        filename: '[name].js',
        libraryTarget: "commonjs2",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            'node_modules',
            'src',
        ],
        plugins: [
            new TsConfigPathsPlugin({
                configFile: path.resolve(__dirname, 'tsconfig.json')
            })
        ]
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.ts$/,
            use: 'awesome-typescript-loader'
        }]
    },
    externals: [nodeExternals()]
};
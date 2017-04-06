const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const port = process.env.PORT || 3000

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: "dist",
    },
    devServer: {
        historyApiFallback: true,
        inline: true,
        compress: false,
        port: port
    },
    externals: {
        writer: 'writer',
        substance: 'substance'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass')
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loaders: [
                    'babel?presets[]=stage-0,presets[]=es2015-node6'
                ]
            }
        ],
        preLoaders: [
            {
                test: /\.js?$/,
                loader: 'eslint',
                exclude: /node_modules/
            }
        ]
    },
    cssLoader: {
        modules: false,
        importLoaders: 1,
        sourceMap: true
    },
    eslint: {
        failOnWarning: false,
        failOnError: false
    },
    plugins: [
        new ExtractTextPlugin("style.css")
    ]
};

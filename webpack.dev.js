var webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./config/helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('public'),
    publicPath: 'http://localhost:3000/',
    filename: 'javascripts/[name].dev.js',
    chunkFilename: 'javascripts/[id].chunk.dev.js'
  },

  plugins: [
    new ExtractTextPlugin('stylesheets/[name].dev.css')
  ],
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
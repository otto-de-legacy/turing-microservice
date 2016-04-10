'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  target: 'web',
  cache: false,
  debug: false,
  devtool: false,
  entry: path.resolve(__dirname, '../../../src/client/app.jsx'),
  output: {
    path: path.resolve(__dirname, '../../server/public'),
    filename: 'js/app.js'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new ExtractTextPlugin('css/main.css')
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loaders: ['babel-loader'],
        exclude: /node_modules\//
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      }
    ]
  },
  sassLoader: {
    outputStyle: 'compressed'
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx'
    ]
  }
};

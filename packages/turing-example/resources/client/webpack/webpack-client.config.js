'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  target: 'web',
  cache: false,
  devtool: false,
  entry: path.resolve(__dirname, '../../../src/client/index.js'),
  output: {
    path: path.resolve(__dirname, '../../server/public'),
    filename: 'js/[name].js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new ExtractTextPlugin('css/main.css')
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules\//
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'sass-loader',
              options: {outputStyle: 'compressed'}
            }
          ]
        })
      }
    ]
  }
};

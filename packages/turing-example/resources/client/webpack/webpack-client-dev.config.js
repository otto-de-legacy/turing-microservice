'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  target: 'web',
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, '../../../src/client/app.js')
  ],
  output: {
    path: path.resolve(__dirname, '../../server/public'),
    filename: 'js/app.js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('css/main.css')
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader?cacheDirectory&presets[]=react-hmre',
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

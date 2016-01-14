const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const path = require('path');
const nodeModulesPath = path.resolve(__dirname, '../../node_modules');

module.exports = {
  target: 'web',
  cache: false,
  debug: false,
  devtool: false,
  entry: [path.resolve(__dirname, '../../src/client/app.jsx')],
  output: {
    path: path.resolve(__dirname, '../../src/server/public'),
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
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader?presets[]=es2015&presets[]=react'],
        exclude: nodeModulesPath
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

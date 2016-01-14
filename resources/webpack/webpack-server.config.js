const fs = require('fs');

const path = require('path');
const nodeModulesPath = path.resolve(__dirname, '../../node_modules');

const nodeModules = {};
const notFound = -1;
fs.readdirSync(nodeModulesPath)
  .filter((folder) => folder.indexOf('.bin') === notFound)
  .forEach((module) => {
    nodeModules[module] = `commonjs ${module}`;
  });

module.exports = {
  target: 'node',
  cache: false,
  debug: false,
  devtool: 'source-map',
  entry: [path.resolve(__dirname, '../../src/server/server.js')],
  output: {
    path: path.resolve(__dirname, '../../target/server'),
    filename: 'server.js'
  },
  externals: nodeModules,
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loaders: ['json-loader']
      },
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader?presets[]=es2015'],
        exclude: nodeModulesPath
      }
    ]
  },
  resolve: {
    extensions: [
      '',
      '.js'
    ]
  },
  node: {
    __dirname: true
  }
};

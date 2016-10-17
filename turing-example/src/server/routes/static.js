'use strict';

const config = require('turing-config');
const webpackClientDevConfig = require('../../../resources/client/webpack/webpack-client-dev.config.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const Express = require('express');

module.exports = class StaticRoutes extends Express.Router {
  constructor() {
    super();
    if (config.get('turing-example:activeProfile') === 'local') {
      webpackClientDevConfig.output.publicPath = config.get('turing-example:server:routes:root');
      const compiler = webpack(webpackClientDevConfig);
      const publicWebpackDevMiddleware = webpackDevMiddleware(compiler, {
        publicPath: webpackClientDevConfig.output.publicPath,
        stats: {
          colors: true,
          chunks: false
        }
      });

      this.use(publicWebpackDevMiddleware);
      this.use(webpackHotMiddleware(compiler));
    } else {
      this.use(config.get('turing-example:server:routes:root'),
        Express.static(`${__dirname}/../../../resources/server/public`, {maxAge: '1m'}));
    }
  }
};

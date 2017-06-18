'use strict';

const config = require('turing-config');
const Express = require('express');

class StaticRouter extends Express.Router {
  constructor() {
    super();
    if (config.get('turing-example:activeProfile') === 'development') {
      const webpack = require('webpack'); // eslint-disable-line global-require
      const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line global-require
      const webpackHotMiddleware = require('webpack-hot-middleware'); // eslint-disable-line global-require
      const webpackConfigDev = require('../../../../resources/client/webpack/webpack.config.dev'); // eslint-disable-line global-require
      webpackConfigDev.output.publicPath = config.get('turing-example:server:routes:root');
      const compiler = webpack(webpackConfigDev);
      const publicWebpackDevMiddleware = webpackDevMiddleware(compiler, {
        publicPath: webpackConfigDev.output.publicPath
      });

      this.use(publicWebpackDevMiddleware);
      this.use(webpackHotMiddleware(compiler));
    } else {
      this.use(config.get('turing-example:server:routes:root'),
        Express.static(`${__dirname}/../../../../resources/server/public`, {maxAge: '1m'}));
    }
  }
}

module.exports = StaticRouter;

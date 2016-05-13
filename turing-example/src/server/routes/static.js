'use strict';

const config = require('turing-config');
const webpackClientDevConfig = require('../../../resources/client/webpack/webpack-client-dev.config.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const router = require('express').Router();

if (config.get('turing-example:env') === 'local') {
  webpackClientDevConfig.output.publicPath = config.get('turing-example:server:routes:root');
  const compiler = webpack(webpackClientDevConfig);
  const publicWebpackDevMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackClientDevConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  });

  router.use(publicWebpackDevMiddleware);
  router.use(webpackHotMiddleware(compiler));
} else {
  router.use(config.get('turing-example:server:routes:root'),
    express.static(`${__dirname}/../../resources/server/public`, {maxAge: '1m'}));
}

module.exports = router;

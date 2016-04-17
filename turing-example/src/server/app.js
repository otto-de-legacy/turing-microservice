'use strict';
// TODO: Split this file into different setup files (assets, routes, etc...)

const server = require('turing-server');
const compression = require('compression');
const consolidate = require('consolidate');
const loggingMiddleware = require('turing-logging').middleware;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('turing-config');
const express = require('express');
const status = require('turing-status');

const webpackClientDevConfig = require('../../resources/client/webpack/webpack-client-dev.config.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

server.disable('x-powered-by');

server.locals.pretty = true;

server.locals.cache = 'memory';

server.use(compression({level: 9}));

server.engine('html', consolidate.swig);
server.set('views', `${__dirname}/../../resources/server/view`);
server.set('view engine', 'html');

server.use(loggingMiddleware);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser());

if (config.get('NODE_ENV') === 'local') {
  webpackClientDevConfig.output.publicPath = config.get('turing-example:server:routes:root');
  const compiler = webpack(webpackClientDevConfig);
  const publicWebpackDevMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackClientDevConfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false
    }
  });

  server.use(publicWebpackDevMiddleware);
  server.use(webpackHotMiddleware(compiler));
} else {
  server.use(config.get('turing-example:server:routes:root'), express.static(`${__dirname}/../../resources/server/public`));
}

require('mongoose').connect(config.get('turing-example:mongo:host'));
require('./model/productModel');

server.use(require('turing-health'));
server.use(status);

server.use(config.get('turing-example:server:routes:root'), require('./routes/public/publicRoutes'));
server.use(`${config.get('turing-example:server:routes:root')}/api`, require('./routes/api/apiRoutes'));

server.get(`${config.get('turing-example:server:routes:root')}/api/status/:status`, (reqest, response) => {
  status.setStatusDetail('toll', {status: reqest.params.status});
  response.end();
});

server.use(require('./routes/errorRoutes'));

module.exports = server;

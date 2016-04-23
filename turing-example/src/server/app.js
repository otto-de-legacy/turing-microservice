'use strict';
// TODO: Split this file into different setup files (assets, routes, etc...)

const app = require('turing-server');
const compression = require('compression');
const consolidate = require('consolidate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('turing-config');
const express = require('express');
const status = require('turing-status');

const webpackClientDevConfig = require('../../resources/client/webpack/webpack-client-dev.config.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

app.disable('x-powered-by');

app.locals.pretty = true;

app.locals.cache = 'memory';

app.use(compression({level: 9}));

app.engine('html', consolidate.swig);
app.set('views', `${__dirname}/../../resources/server/view`);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

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

  app.use(publicWebpackDevMiddleware);
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(config.get('turing-example:server:routes:root'), express.static(`${__dirname}/../../resources/server/public`));
}

require('mongoose').connect(config.get('turing-example:mongo:host'));
require('./model/productModel');

app.use(require('turing-health'));
app.use(status);

app.use(config.get('turing-example:server:routes:root'), require('./routes/public/publicRoutes'));
app.use(`${config.get('turing-example:server:routes:root')}/api`, require('./routes/api/apiRoutes'));

app.get(`${config.get('turing-example:server:routes:root')}/api/status/:status`, (reqest, response) => {
  status.addStatusDetail('toll', {status: reqest.params.status});
  response.end();
});

app.use(require('./routes/errorRoutes'));

module.exports = app;

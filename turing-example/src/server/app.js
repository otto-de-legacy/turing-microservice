const server = require('turing-server');
const config = require('turing-config');
const health = require('turing-health');
const status = require('turing-status');
const logging = require('turing-logging');
const bodyParser = require('body-parser');
const express = require('express');
const compression = require('compression');
const consolidate = require('consolidate');
const cookieParser = require('cookie-parser');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackClientDevConfig = require('../../resources/client/webpack/webpack-client-dev.config.js');

server.disable('x-powered-by');

server.locals.pretty = true;

server.locals.cache = 'memory';

server.use(compression({level: 9}));

server.engine('html', consolidate.swig);
server.set('views', `${__dirname}/../../resources/server/view`);
server.set('view engine', 'html');

server.use(logging.middleware);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser());

if (config.get('env') === 'local') {
  webpackClientDevConfig.output.publicPath = config.rootPath;
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
  server.use(config.rootPath, express.static(`${__dirname}/../../resources/server/public`));
}

const dbUrl = config.get('db-url');
if (dbUrl) {
  require('mongoose').connect(dbUrl);
}
require('./model/productModel');

server.use(health);
server.use(status);

server.use(config.rootPath, require('./routes/public/publicRoutes'));
server.use(`${config.rootPath}/api`, require('./routes/api/apiRoutes'));

server.use(require('./routes/errorRoutes'));

module.exports = server;

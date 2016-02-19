const config = require('config');
const bodyParser = require('body-parser');
const express = require('express');
const compression = require('compression');
const consolidate = require('consolidate');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackClientDevConfig = require('../../resources/client/webpack/webpack-client-dev.config.js');

const app = express();

app.disable('x-powered-by');

app.locals.pretty = true;

app.locals.cache = 'memory';

app.use(compression({level: 9}));

app.engine('html', consolidate.swig);
app.set('views', `${__dirname}/../../resources/server/view`);
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

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

  app.use(publicWebpackDevMiddleware);
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(config.rootPath, express.static(`${__dirname}/../../resources/server/public`));
}

require('mongoose').connect(config.get('db-url'));
require('./model/productModel');

app.use(config.rootPath, require('./routes/public/publicRoutes'));
app.use(`${config.rootPath}/api`, require('./routes/api/apiRoutes'));
app.use(`${config.rootPath}/internal`, require('./routes/internal/internalRoutes'));

app.use(require('./routes/errorRoutes'));

module.exports = app;

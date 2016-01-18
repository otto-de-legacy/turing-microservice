const bodyParser = require('body-parser');
const express = require('express');
const compression = require('compression');
const consolidate = require('consolidate');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const publicRoutes = require('./routes/public/publicRoutes');
const internalRoutes = require('./routes/internal/internalRoutes');
const errorRoutes = require('./routes/errorRoutes');

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

if (process.env.NODE_ENV === 'production') {
  app.use('/turing-microservice', express.static(`${__dirname}/../../resources/server/public`));
} else {
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
}

app.use('/turing-microservice', publicRoutes);
app.use('/turing-microservice/internal', internalRoutes);

app.use(errorRoutes);

module.exports = app;

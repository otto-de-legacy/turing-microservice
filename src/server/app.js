import bodyParser from 'body-parser';
import express from 'express';
import compression from 'compression';
import consolidate from 'consolidate';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import publicRoutes from './routes/public/publicRoutes';
import internalRoutes from './routes/internal/internalRoutes';
import errorRoutes from './routes/errorRoutes';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackClientDevConfig from '../../resources/webpack/webpack-client-dev.config.js';

const app = express();

app.disable('x-powered-by');

app.locals.pretty = true;

app.locals.cache = 'memory';

app.use(compression({level: 9}));

app.engine('html', consolidate.swig);
app.set('views', `${__dirname}/view`);
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use('/turing-microservice', express.static(`${__dirname}/public`));
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

export default app;

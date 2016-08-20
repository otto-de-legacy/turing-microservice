'use strict';

require('./model/models');

const TuringServer = require('turing-server');
const compression = require('compression');
const consolidate = require('consolidate');
const morgan = require('morgan');
const logger = require('turing-logging').logger;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const StaticRoutes = require('./routes/static');
const Routes = require('./routes/routes');

module.exports = class TuringExampleApp extends TuringServer {
  constructor() {
    super();

    this.use(compression({level: 9}));

    this.engine('html', consolidate.swig);
    this.set('views', `${__dirname}/../../resources/server/view`);
    this.set('view engine', 'html');

    this.use(morgan('combined', {
      stream: logger.stream({
        type: 'turing-example-accesslog',
        logformat: 'COMBINEDAPACHELOG'
      })
    }));
    this.use(bodyParser.json());
    this.use(bodyParser.urlencoded({extended: false}));
    this.use(cookieParser());

    this.use(new StaticRoutes());

    this.use(new Routes());
  }
};

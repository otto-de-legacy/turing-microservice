'use strict';

require('./common/domain/Model');

const TuringServer = require('turing-server');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const StaticRouter = require('./common/web/StaticRouter');
const AppRouter = require('./AppRouter');

class TuringExampleApp extends TuringServer {
  constructor() {
    super();
    this.use(compression({level: 9}));

    this.set('views', `${__dirname}/../../resources/server/view`);

    this.use(bodyParser.json());
    this.use(bodyParser.urlencoded({extended: false}));
    this.use(cookieParser());

    this.use(new StaticRouter());

    this.use(new AppRouter());
  }
}

module.exports = TuringExampleApp;

'use strict';

const GlobalRequestLogger = require('./lib/globalRequestLogger');
const Logger = require('./lib/logger');
const Middleware = require('./lib/middleware');

module.exports = {
  GlobalRequestLogger,
  logger: new Logger(),
  Middleware
};

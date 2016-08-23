'use strict';

const GlobalRequestLogger = require('./lib/globalRequestLogger');
const logger = require('./lib/logger');
const Middleware = require('./lib/middleware');

module.exports = {
  GlobalRequestLogger,
  logger,
  Middleware
};

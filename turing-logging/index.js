'use strict';

const globalRequestLogger = require('./lib/globalRequestLogger');
const logger = require('./lib/logger');
const middleware = require('./lib/middleware');

module.exports = {
  globalRequestLogger,
  logger,
  middleware
};

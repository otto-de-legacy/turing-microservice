// TODO (BS): add to readme.md!!

'use strict';

const globalRequestLogger = require('global-request-logger');
const logger = require('./logger');

class GlobalRequestLogger {
  static initialize() {
    globalRequestLogger.initialize();
    globalRequestLogger.on('success', (request) => {
      logger.info('Request', request);
    });
    globalRequestLogger.on('error', (request) => {
      logger.info('Request', request);
    });
  }
}

module.exports = GlobalRequestLogger;

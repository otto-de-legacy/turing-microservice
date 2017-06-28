// TODO (BS): add to readme.md!!

'use strict';

const globalRequestLogger = require('global-request-logger');
const logger = require('./logger');

class GlobalRequestLogger {
  static initialize() {
    globalRequestLogger.initialize();
    globalRequestLogger.on('success', (request, response) => {
      logger.info(`Request: ${JSON.stringify(request)}`);
      logger.info(`Response: ${JSON.stringify(response)}`);
    });
    globalRequestLogger.on('error', (request, response) => {
      logger.info(`Request: ${JSON.stringify(request)}`);
      logger.info(`Response: ${JSON.stringify(response)}`);
    });
  }
}

module.exports = GlobalRequestLogger;

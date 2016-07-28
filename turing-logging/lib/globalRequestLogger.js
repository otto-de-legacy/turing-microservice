'use strict';

const globalRequestLogger = require('global-request-logger');
const logger = require('./logger');

module.exports = (() => {
  function initialize() {
    globalRequestLogger.initialize();
    globalRequestLogger.on('success', (request) => {
      logger.info('Request', request);
    });
    globalRequestLogger.on('error', (request) => {
      logger.info('Request', request);
    });
  }

  return {
    initialize
  };
})();

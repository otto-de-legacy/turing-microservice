'use strict';

const logger = require('turing-logging').logger;
const config = require('turing-config');

module.exports = class PublicController {
  static index(request, response) {
    logger.info('Hallo Welt!');
    logger.warn('Die Apokalypse ist nah...');
    logger.error('Welt kaputt :-(');
    response.render('index', {
      title: 'turing-example',
      rootPath: config.get('turing-example:server:routes:root')
    });
  }
};

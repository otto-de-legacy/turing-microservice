'use strict';

const log = require('turing-logging').logger;
const config = require('turing-config');

module.exports = class PublicController {
  static index(request, response) {
    log.info('Hallo Welt!');
    log.warn('Die Apokalypse ist nah...');
    log.error('Welt kaputt :-(');
    response.render('index', {
      title: 'turing-example',
      rootPath: config.get('turing-example:server:routes:root')
    });
  }
};

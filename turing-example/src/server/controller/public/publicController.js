'use strict';

const config = require('turing-config');
const logger = require('turing-logging').logger;

module.exports = (() => {
  function index(request, response) {
    logger.info('Hallo Welt!');
    logger.warn('Die Apokalypse ist nah...');
    logger.error('Welt kaputt :-(');
    response.render('index', {
      title: 'turing-example',
      rootPath: config.get('turing-example:server:routes:root')
    });
  }

  return {
    index
  };
})();

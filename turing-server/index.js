'use strict';

const Express = require('express');
const favicon = require('serve-favicon');
const LoggingMiddleware = require('turing-logging').Middleware;
const config = require('turing-config');
const morgan = require('morgan');
const logger = require('turing-logging').logger;
const pkg = require(`${__dirname}/package.json`);

function getSpecific(error, port) {
  if (error.syscall !== 'listen') {
    return error;
  }
  switch (error.code) {
    case 'EACCES':
      return new Error(`Port ${port} requires elevated privileges`);
    case 'EADDRINUSE':
      return new Error(`Port ${port} is already in use`);
    default:
      return error;
  }
}

module.exports = class TuringServer extends Express {
  constructor() {
    super();
    this.disable('x-powered-by');
    this.enable('strict routing');

    this.use(favicon(`${__dirname}/public/favicon.ico`));

    this.use(new LoggingMiddleware().spy);

    if (config.get('turing:logging:accesslog:enabled')) {
      const format = config.get('turing:logging:accesslog:format');
      this.use(morgan(format, {
        stream: logger.stream({
          type: 'sharing-accesslog',
          logformat: 'COMBINEDAPACHELOG'
        })
      }));
    }

    this.start = () => {
      const port = config.get('turing:server:port');
      const server = config.get('turing:server:onlyIPv4') ? this.listen(port, '0.0.0.0') : this.listen(port);
      server.on('listening', () => {
        logger.info(`${pkg.name} microservice listening on port ${port}!`);
      });
      server.on('error', (error) => {
        const specificError = getSpecific(error, port);
        logger.error(specificError);
        throw specificError;
      });
    };
  }
};

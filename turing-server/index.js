'use strict';

const Express = require('express');
const favicon = require('serve-favicon');
const {Middleware: LoggingMiddleware} = require('turing-logging');
const config = require('turing-config');
const morgan = require('morgan');
const {logger: log} = require('turing-logging');
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

class TuringServer extends Express {
  constructor() {
    super();
    this.disable('x-powered-by');
    this.enable('strict routing');

    this.set('view engine', 'pug');

    this.use(favicon(`${__dirname}/public/favicon.ico`));

    this.use(LoggingMiddleware.spy);

    if (config.get('turing:logging:accesslog:enabled')) {
      const format = config.get('turing:logging:accesslog:format');
      const skipHealthUrl = config.get('turing:logging:accesslog:skipHealthUrl');
      const healthUrl = `${config.get('turing:server:routes:internal')}${config.get('turing:health:route')}`;
      const skipStatusUrl = config.get('turing:logging:accesslog:skipStatusUrl');
      const statusUrl = `${config.get('turing:server:routes:internal')}${config.get('turing:status:route')}`;
      this.use(morgan(format, {
        stream: log.stream(config.get('turing:logging:accesslog:meta')),
        skip: (request) => {
          const pathname = request.originalUrl;
          return skipHealthUrl && pathname.endsWith(healthUrl) || skipStatusUrl && pathname.endsWith(statusUrl);
        }
      }));
    }

    this.start = () => {
      const port = config.get('turing:server:port');
      const server = config.get('turing:server:onlyIPv4') ? this.listen(port, '0.0.0.0') : this.listen(port);
      server.on('listening', () => {
        log.info(`${pkg.name} microservice listening on port ${port}!`);
      });
      server.on('error', (error) => {
        const specificError = getSpecific(error, port);
        log.error(specificError);
        throw specificError;
      });
    };
  }
}

module.exports = TuringServer;

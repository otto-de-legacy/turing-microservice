'use strict';

const express = require('express');
const favicon = require('serve-favicon');
const loggingMiddleware = require('turing-logging').middleware;
const config = require('turing-config');
const logger = require('turing-logging').logger;
const pkg = require(require('path').join(process.cwd(), 'package.json'));

const app = express();

app.disable('x-powered-by');
app.enable('strict routing');

app.use(favicon(`${__dirname}/public/favicon.ico`));

app.use(loggingMiddleware);

app.start = () => {
  const port = config.get('turing:server:port');

  const server = config.get('turing:server:onlyIPv4') ? app.listen(port, '127.0.0.1') : app.listen(port);
  server.on('listening', () => {
    logger.info(`${pkg.name} microservice listening on port ${port}!`);
  });
  server.on('error', (error) => {
    if (error.syscall !== 'listen') {
      logger.error(error);
      throw error;
    }
    switch (error.code) {
      case 'EACCES':
        logger.error(`Port ${port} requires elevated privileges`);
        throw new Error(`Port ${port} requires elevated privileges`);
      case 'EADDRINUSE':
        logger.error(`Port ${port} is already in use`);
        throw new Error(`Port ${port} is already in use`);
      default:
        logger.error(error);
        throw error;
    }
  });
};

module.exports = app;

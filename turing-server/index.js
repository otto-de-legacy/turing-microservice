'use strict';

const express = require('express');
const loggingMiddleware = require('turing-logging').middleware;
const config = require('turing-config');
const logger = require('turing-logging').logger;
const pkg = require(require('path').join(process.cwd(), 'package.json'));

const app = express().enable('strict routing');

app.use(loggingMiddleware);

app.start = () => {
  const port = config.get('turing:server:port');

  app.listen(port, () => {
    logger.info(`${pkg.name} microservice listening on port ${port}!`);
  }).on('error', (error) => {
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

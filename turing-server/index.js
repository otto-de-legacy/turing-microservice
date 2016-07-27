'use strict';

const express = require('express');
const favicon = require('serve-favicon');
const loggingMiddleware = require('turing-logging').middleware;
const config = require('turing-config');
const logger = require('turing-logging').logger;
const pkg = require(require('path').join(process.cwd(), 'package.json'));

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

const app = express();

app.disable('x-powered-by');
app.enable('strict routing');

app.use(favicon(`${__dirname}/public/favicon.ico`));

app.use(loggingMiddleware);

app.start = () => {
  const port = config.get('turing:server:port');

  const server = config.get('turing:server:onlyIPv4') ? app.listen(port, '0.0.0.0') : app.listen(port);
  server.on('listening', () => {
    logger.info(`${pkg.name} microservice listening on port ${port}!`);
  });
  server.on('error', (error) => {
    const specificError = getSpecific(error, port);
    logger.error(specificError);
    throw specificError;
  });
};

module.exports = app;

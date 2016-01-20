#!/usr/bin/env node
const config = require('../resources/server/config');
const debug = require('debug');

const app = require('../src/server/app');
app.set('port', config.port);

const server = require('http').createServer(app);
server.listen(config.port);
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      throw new Error(`Port ${config.port} requires elevated privileges`);
    case 'EADDRINUSE':
      throw new Error(`Port ${config.port} is already in use`);
    default:
      throw error;
  }
});
server.on('listening', () => {
  // TODO get this value from ${config.rootPath}
  debug('turing-microservice:server')(`Listening on port ${server.address().port}`);
});

#!/usr/bin/env node
const debug = require('debug');

function normalizePort(val) {
  const port = parseInt(val);
  if (isNaN(port) || port < 0) {
    throw new Error(`Port ${val} is not a valid port`);
  }
  return port;
}

const app = require('../src/server/app');
const port = normalizePort(process.env.PORT);

app.set('port', port);

const server = require('http').createServer(app);
server.listen(port);
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      throw new Error(`Port ${port} requires elevated privileges`);
    case 'EADDRINUSE':
      throw new Error(`Port ${port} is already in use`);
    default:
      throw error;
  }
});
server.on('listening', () => {
  debug('turing-microservice:server')(`Listening on port ${server.address().port}`);
});

#!/usr/bin/env node

function normalizePort(val) {
  const port = parseInt(val);
  if (isNaN(port) || port < 0) {
    throw new Error(`Port ${val} is not a valid port`);
  }
  return port;
}

const app = require('./server/app');
const PORT = 8080;
const port = normalizePort(process.env.PORT || PORT);

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
  require('debug')('turing-microservice:server')(`Listening on port ${server.address().port}`);
});

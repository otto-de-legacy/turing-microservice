#!/usr/bin/env node
const vaulted = require('turing-vault');
const logger = require('turing-logging').logger;

vaulted.then(() => {
  require('../src/server/app.js').start();
}).catch((error) => {
  logger.error(error);
  throw error;
});

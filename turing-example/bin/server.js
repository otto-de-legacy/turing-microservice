#!/usr/bin/env node
'use strict';

const vaulted = require('turing-vault');
const app = require('../src/server/app.js');
const logger = require('turing-logging').logger;

vaulted.then(() => {
  app.start();
}).catch((error) => {
  logger.error(error);
  throw error;
});

#!/usr/bin/env node
'use strict';

const TuringVault = require('turing-vault');
const TuringMongo = require('turing-mongo');
const TuringExampleApp = require('../src/server/app');
const logger = require('turing-logging').logger;

const turingVault = new TuringVault();
turingVault.then(() => {
  new TuringMongo().then(() => {
    new TuringExampleApp().start();
  });
}).catch((error) => {
  logger.error(error);
  throw error;
});

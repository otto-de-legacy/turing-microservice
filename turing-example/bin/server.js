#!/usr/bin/env node
'use strict';

const TuringVault = require('turing-vault');
const turingMongo = require('turing-mongo');
const TuringExampleApp = require('../src/server/app');
const logger = require('turing-logging').logger;

const turingVault = new TuringVault();
turingVault.then(() => {
  turingMongo.setupConnection().then(() => {
    new TuringExampleApp().start();
  });
}).catch((error) => {
  logger.error(error);
  throw error;
});

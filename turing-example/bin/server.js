'use strict';

const TuringVault = require('turing-vault');
const turingMongo = require('turing-mongo');
const TuringExampleApp = require('../src/server/app');
const log = require('turing-logging').logger;

const turingVault = new TuringVault();
turingVault.then(() => {
  turingMongo.setupConnection().then(() => {
    new TuringExampleApp().start();
  });
}).catch((error) => {
  log.error(error);
  throw error;
});

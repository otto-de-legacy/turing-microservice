'use strict';

const turingMongo = require('turing-mongo');
const TuringExampleApp = require('../src/server/App');
const {logger: log} = require('turing-logging');

turingMongo.setupConnection()
  .then(() => {
    new TuringExampleApp().start();
  })
  .catch((error) => {
    log.error(error);
    throw error;
  });

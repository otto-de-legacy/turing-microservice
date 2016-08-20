'use strict';

const config = require('turing-config');
const logger = require('turing-logging').logger;
const mongoose = require('mongoose');

module.exports = class TuringMongo extends Promise {
  constructor() {
    super((resolve, reject) => {
      const url = config.get('turing-example:mongo:host');

      logger.info(`Mongoose connecting to ${url}`);
      mongoose.connect(url);

      mongoose.connection.on('connected', () => {
        logger.info(`Mongoose default connection open to ${url}`);
        resolve();
      });

      mongoose.connection.on('error', (error) => {
        reject(error);
      });

      mongoose.connection.on('disconnected', () => {
        logger.info('Mongoose default connection disconnected');
      });

      function gracefulExit() {
        mongoose.connection.close(() => {
          logger.info('Mongoose default connection disconnected through app termination');
          process.exit(0); // eslint-disable-line no-process-exit
        });
      }

      process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
    });
  }
};

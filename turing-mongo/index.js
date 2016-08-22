'use strict';

const mongoose = require('mongoose');
const config = require('turing-config');
const logger = require('turing-logging').logger;

class TuringMongo extends mongoose.Mongoose {
  setupConnection() {
    return new Promise((resolve, reject) => {
      const uri = config.get('turing:mongo:uri');

      logger.info(`Mongoose connecting to ${uri}`);
      this.connect(uri);

      this.connection.on('connected', () => {
        logger.info(`Mongoose default connection open to ${uri}`);
        resolve();
      });

      this.connection.on('error', (error) => {
        reject(error);
      });

      this.connection.on('disconnected', () => {
        logger.info('Mongoose default connection disconnected');
      });

      const gracefulExit = () => {
        this.connection.close(() => {
          logger.info('Mongoose default connection disconnected through app termination');
          process.exit(0); // eslint-disable-line no-process-exit
        });
      };
      process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
    });
  }
}

module.exports = new TuringMongo();

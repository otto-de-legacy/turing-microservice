'use strict';

const mongoose = require('mongoose');
const config = require('turing-config');
const logger = require('turing-logging').logger;

class TuringMongo extends mongoose.Mongoose {
  setupConnection() {
    return new Promise((resolve, reject) => {
      const host = config.get('turing:mongo:host');
      const db = config.get('turing:mongo:db');
      const user = config.get('turing:mongo:user');
      const password = config.get('turing:mongo:password');

      const userAndPassword = user && password ? `${user}:${password}@` : '';
      const uri = `mongodb://${userAndPassword}${host}/${db}`;

      logger.info(`Mongoose connecting to ${host}`);
      this.connect(uri);

      this.connection.on('connected', () => {
        logger.info(`Mongoose default connection open to ${host}`);
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

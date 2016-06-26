'use strict';

const config = require('turing-config');
const winston = require('winston');
const stackTrace = require('stack-trace');
const path = require('path');
const cls = require('continuation-local-storage');

const transportModules = config.get('turing:logging:transports');
const transports = [];

transportModules.forEach((transportModule) => {
  try {
    let Transport;
    if (transportModule.type) {
      Transport = winston.transports[transportModule.type];
    } else if (transportModule.module) {
      Transport = require(transportModule.module);
    }
    if (Transport) {
      transports.push(new Transport(transportModule.opts));
    }
  } catch (error) {
    console.log(error);
  }
});

const logger = new winston.Logger({
  exitOnError: false,
  transports
});

function findCaller() {
  const caller = stackTrace.get()[6];

  const file = path.relative(process.cwd(), caller.getFileName());
  const line = caller.getLineNumber();
  const column = caller.getColumnNumber();

  return `${file}#${line}:${column}`;
}

logger.rewriters.push((level, msg, meta) => {
  const namespace = cls.getNamespace(config.get('turing:logging:namespace'));
  const request = namespace.get('request');
  const uuid = namespace.get('uuid');
  const metaFromConf = config.get('turing:logging:meta');

  if (uuid) {
    meta.uuid = uuid;
  }

  meta.caller = findCaller();

  if (request) {
    const headers = config.get('turing:logging:headers');
    headers.forEach((header) => {
      const value = request.headers[header];
      if (value) {
        meta[header] = value;
      }
    });
  }

  return Object.assign(metaFromConf, meta || {});
});

logger.stream = (meta) => {
  const stream = {
    write: (message) => {
      logger.info(message, meta);
    }
  };
  return stream;
};

module.exports = logger;

// TODO: Do not log with logger - use eventBus for logging

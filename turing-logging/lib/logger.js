'use strict';

const config = require('turing-config');
const winston = require('winston');
const stackTrace = require('stack-trace');
const path = require('path');
const cls = require('continuation-local-storage');

function getTransports() {
  const transportModules = config.get('turing:logging:transports');
  return transportModules.map((transportModule) => {
    let Transport;
    if (transportModule.type) {
      Transport = winston.transports[transportModule.type];
    } else if (transportModule.module) {
      Transport = require(transportModule.module);
    }
    return new Transport(transportModule.opts);
  });
}

function findCaller() {
  const caller = stackTrace.get()[6];

  const file = path.relative(process.cwd(), caller.getFileName());
  const line = caller.getLineNumber();
  const column = caller.getColumnNumber();

  return `${file}#${line}:${column}`;
}

class TuringLogger extends winston.Logger {
  constructor() {
    super({
      exitOnError: false,
      transports: getTransports()
    });

    this.rewriters.push((level, msg, meta) => {
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

      if (meta.stack) {
        meta.stacktrace = meta.stack;
      }

      return Object.assign(metaFromConf, meta);
    });

    this.filters.push((level, msg, meta) => {
      const trace = meta.stacktrace;
      if (trace) {
        delete meta.stacktrace;
        return {
          msg: trace,
          meta
        };
      }
      return msg;
    });
  }

  stream(meta) {
    return {
      write: (message) => {
        this.info(message, meta);
      }
    };
  }
}

module.exports = new TuringLogger();

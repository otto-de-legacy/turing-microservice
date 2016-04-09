"use strict";

var winston = require("winston");
var merge = require("deeply");
var cls = require("continuation-local-storage");
var config = require("turing-config");
var stackTrace = require("stack-trace");
var path = require("path");

// add root node_modules for local development with npm workspace/symlinks
require('app-module-path').addPath(process.cwd() + '/node_modules');

var transportModules = config.get("turing:logging:transports"),
    transports = [];

transportModules.forEach(function(transportModule) {
    try {
      var Transport;
      if (transportModule.type) {
        Transport = winston.transports[transportModule.type];
      } else if(transportModule.module) {
        Transport = require(transportModule.module)
      }

      if (Transport) {
        transports.push(new (Transport)(transportModule.opts));
      }
    } catch (e) {
        console.log(e);
    }
});

var logger = new (winston.Logger)({
    "exitOnError": false,
    "transports": transports
});

function findCaller() {
    // Achtung: die 6 ist hier hart drin, da 6 Aufrufe/Funktionen nach dem eigentlichen log call kommen
    var caller = stackTrace.get()[6],
        file = path.relative(process.cwd(), caller.getFileName()),
        line = caller.getLineNumber(),
        column = caller.getColumnNumber();

    return `${file}#${line}:${column}`;
}

logger.rewriters.push(function(level, msg, meta) {
    var namespace = cls.getNamespace(config.get("turing:logging:namespace")),
        req = namespace.get("req"),
        res = namespace.get("res"),
        uuid = namespace.get("uuid"),
        metaFromConf = config.get("turing:logging:meta");

    if (!!uuid) {
        meta.uuid = uuid;
    }

    if (!!req) {
        var headers = config.get("turing:logging:headers");

        headers.forEach(function(header) {
            var value = req.headers[header];

            if (value) {
                meta[header] = value;
            }
        });
    }

    meta = merge(meta, metaFromConf);

    meta.caller = findCaller();

    return meta;
});

module.exports = logger;

'use strict';

const cls = require('continuation-local-storage');
const config = require('turing-config');
const namespace = cls.createNamespace(config.get('turing:logging:namespace'));
const uuid = require('uuid');

module.exports = (request, response, next) => {
  namespace.bindEmitter(request);
  namespace.bindEmitter(response);
  namespace.run(() => {
    namespace.set('request', request);
    namespace.set('response', response);
    namespace.set('uuid', uuid.v4());

    // TODO: Maybe log each request?!

    next();
  });
};

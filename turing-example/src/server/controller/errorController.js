'use strict';

const httpHeaderHelper = require('../helper/httpHeaderHelper');

module.exports = (() => {
  function notFound(request, response, next) {
    response.set(httpHeaderHelper.SURROGATE_CONTROL, 'max-age=60');
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  }

  return {
    notFound
  };
})();

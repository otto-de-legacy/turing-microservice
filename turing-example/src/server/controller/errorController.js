'use strict';

const HttpHeaderHelper = require('../helper/httpHeaderHelper');

module.exports = class ErrorController {
  static notFound(request, response, next) {
    response.set(HttpHeaderHelper.SURROGATE_CONTROL, 'max-age=60');
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  }
};

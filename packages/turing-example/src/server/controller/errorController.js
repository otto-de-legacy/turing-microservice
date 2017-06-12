'use strict';

const HttpHeader = require('../helper/httpHeaderHelper');
const HttpStatus = require('http-status');

class ErrorController {
  static notFound(request, response, next) {
    response.set(HttpHeader.SURROGATE_CONTROL, 'max-age=60');
    const notFound = HttpStatus.NOT_FOUND;
    const error = new Error(HttpStatus[notFound]);
    error.status = notFound;
    next(error);
  }
}

module.exports = ErrorController;

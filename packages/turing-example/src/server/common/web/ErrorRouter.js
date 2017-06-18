'use strict';

const Express = require('express');
const ErrorController = require('./ErrorController');

class ErrorRouter extends Express.Router {
  constructor() {
    super();
    this.use(ErrorController.notFound);
  }
}

module.exports = ErrorRouter;

'use strict';

const Express = require('express');
const ErrorController = require('../controller/errorController');

class ErrorRoutes extends Express.Router {
  constructor() {
    super();
    this.use(ErrorController.notFound);
  }
}

module.exports = ErrorRoutes;

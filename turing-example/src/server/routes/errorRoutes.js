'use strict';

const Express = require('express');
const ErrorController = require('../controller/errorController');

module.exports = class ErrorRoutes extends Express.Router {
  constructor() {
    super();
    this.use(ErrorController.notFound);
  }
};

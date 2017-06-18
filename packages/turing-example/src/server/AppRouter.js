'use strict';

const Express = require('express');
const config = require('turing-config');
const ProductRouter = require('./product/web/ProductRouter');
const TuringHealth = require('turing-health');
const TuringStatus = require('turing-status');
const turingStatus = new TuringStatus();
const ErrorRoutes = require('./common/web/ErrorRouter');

class AppRouter extends Express.Router {
  constructor() {
    super();

    this.use(`${config.get('turing-example:server:routes:root')}/api`, new ProductRouter());
    this.get(`${config.get('turing-example:server:routes:root')}/api/status/:status/:message`, (reqest, response) => {
      turingStatus.addStatusDetail('toll', reqest.params.status, reqest.params.message);
      response.end();
    });

    this.use(new TuringHealth());
    this.use(turingStatus);

    this.use(new ErrorRoutes());
  }
}

module.exports = AppRouter;

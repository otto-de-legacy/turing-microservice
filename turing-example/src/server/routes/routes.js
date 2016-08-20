'use strict';

const Express = require('express');
const config = require('turing-config');
const PublicRoutes = require('./public/publicRoutes');
const ApiRoutes = require('./api/apiRoutes');
const TuringHealth = require('turing-health');
const TuringStatus = require('turing-status');
const turingStatus = new TuringStatus();
const ErrorRoutes = require('./errorRoutes');

module.exports = class Routes extends Express.Router {
  constructor() {
    super();
    this.use(config.get('turing-example:server:routes:root'), new PublicRoutes());
    this.use(`${config.get('turing-example:server:routes:root')}/api`, new ApiRoutes());
    this.use(new TuringHealth());
    this.use(turingStatus);

    this.get(`${config.get('turing-example:server:routes:root')}/api/status/:status/:message`, (reqest, response) => {
      turingStatus.addStatusDetail('toll', reqest.params.status, reqest.params.message);
      response.end();
    });

    this.use(new ErrorRoutes());
  }
};

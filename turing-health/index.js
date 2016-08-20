'use strict';

const Express = require('express');
const config = require('turing-config');

module.exports = class TuringHealth extends Express.Router {
  constructor() {
    super();
    this.get(`${config.get('turing:server:routes:internal')}${config.get('turing:health:route')}`, (request, response) => {
      response.json({
        status: 'UP',
        application: {
          status: 'UP'
        }
      });
    });
  }
};

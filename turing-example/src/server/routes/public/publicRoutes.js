'use strict';

const Express = require('express');
const PublicController = require('../../controller/public/publicController');

class PublicRoutes extends Express.Router {
  constructor() {
    super();
    this.get('/', PublicController.index);
  }
}

module.exports = PublicRoutes;

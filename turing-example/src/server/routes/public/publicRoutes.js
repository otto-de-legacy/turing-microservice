'use strict';

const Express = require('express');
const PublicController = require('../../controller/public/publicController');

module.exports = class PublicRoutes extends Express.Router {
  constructor() {
    super();
    this.get('/', PublicController.index);
  }
};

'use strict';

const Express = require('express');
const ProductApiController = require('../../../controller/api/product/productApiController');

module.exports = class ProductApiRoutes extends Express.Router {
  constructor() {
    super();
    this.get('/', ProductApiController.find);
    this.post('/', ProductApiController.save);
  }
};

'use strict';

const Express = require('express');
const ProductApiController = require('../../../controller/api/product/productApiController');

class ProductApiRoutes extends Express.Router {
  constructor() {
    super();
    this.get('/', ProductApiController.find);
    this.post('/', ProductApiController.save);
  }
}

module.exports = ProductApiRoutes;

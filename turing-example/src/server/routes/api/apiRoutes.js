'use strict';

const Express = require('express');
const ProductApiRoutes = require('./product/productApiRoutes');

module.exports = class ApiRoutes extends Express.Router {
  constructor() {
    super();
    this.use('/products', new ProductApiRoutes());
  }
};

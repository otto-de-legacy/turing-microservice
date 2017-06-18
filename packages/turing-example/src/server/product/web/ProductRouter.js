'use strict';

const Express = require('express');
const ProductController = require('./ProductController');

class ProductApiRoutes extends Express.Router {
  constructor() {
    super();
    this.get('/products/', ProductController.find);
    this.post('/products/', ProductController.save);
  }
}

module.exports = ProductApiRoutes;

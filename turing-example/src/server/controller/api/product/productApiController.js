'use strict';

const Product = require('turing-mongo').model('Product');

class ProductApiController {
  static find(request, response, next) {
    Product.find().exec((error, products) => {
      if (error) {
        return next(error);
      }
      return response.json(products);
    });
  }

  static save(request, response, next) {
    const product = new Product(request.body);
    product.save((error) => {
      if (error) {
        return next(error);
      }
      return response.end();
    });
  }
}

module.exports = ProductApiController;

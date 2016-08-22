'use strict';

const Product = require('turing-mongo').model('Product');

module.exports = class ProductApiController {
  static find(request, response, next) {
    Product.find().exec((error, products) => {
      if (error) {
        next(error);
      }
      response.json(products);
    });
  }

  static save(request, response, next) {
    const product = new Product(request.body);
    product.save((error) => {
      if (error) {
        next(error);
      } else {
        response.end();
      }
    });
  }
};

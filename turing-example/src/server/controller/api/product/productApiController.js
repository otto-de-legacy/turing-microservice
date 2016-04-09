const Product = require('mongoose').model('Product');

module.exports = (() => {
  function find(request, response, next) {
    Product.find().exec((error, products) => {
      if (error) {
        next(error);
      }
      response.json(products);
    });
  }

  function save(request, response, next) {
    const product = new Product(request.body);
    product.save((error) => {
      if (error) {
        next(error);
      } else {
        response.end();
      }
    });
  }

  return {
    find,
    save
  };
})();

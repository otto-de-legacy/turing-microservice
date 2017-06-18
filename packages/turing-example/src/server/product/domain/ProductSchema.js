'use strict';

const turingMongo = require('turing-mongo');

class ProductSchema extends turingMongo.Schema {
  constructor() {
    super({
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    });
  }
}

turingMongo.model('Product', new ProductSchema());

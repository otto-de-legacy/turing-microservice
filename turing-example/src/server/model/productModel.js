'use strict';

const mongoose = require('mongoose');

class ProductSchema extends mongoose.Schema {
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

mongoose.model('Product', new ProductSchema());

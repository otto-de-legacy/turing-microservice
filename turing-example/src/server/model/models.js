'use strict';

const config = require('turing-config');

require('mongoose').connect(config.get('turing-example:mongo:host'));
require('./productModel');

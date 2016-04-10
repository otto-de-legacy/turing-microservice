'use strict';

const router = require('express').Router();
const productApiRoutes = require('./product/productApiRoutes');

router.use('/products', productApiRoutes);

module.exports = router;

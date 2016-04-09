'use strict';

const productApiRoutes = require('./product/productApiRoutes');
const router = require('express').Router();

router.use('/products', productApiRoutes);

module.exports = router;

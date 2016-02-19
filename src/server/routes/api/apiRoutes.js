const productApiRoutes = require('./product/productApiRoutes');
const router = require('express').Router();

router.use('/product', productApiRoutes);

module.exports = router;

'use strict';

const router = require('express').Router();
const productApiController = require('../../../controller/api/product/productApiController');

router.get('/', productApiController.find);
router.post('/', productApiController.save);

module.exports = router;

const productApiController = require('../../../controller/api/product/productApiController');
const router = require('express').Router();

router.get('/', productApiController.find);
router.post('/', productApiController.save);

module.exports = router;

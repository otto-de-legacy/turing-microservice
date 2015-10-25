const publicController = require('../../controllers/public/publicController');
const router = require('express').Router();

router.get('/', publicController.index);

module.exports = router;

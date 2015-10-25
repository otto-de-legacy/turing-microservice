const errorController = require('../controllers/errorController');
const router = require('express').Router();

router.use(errorController.notFound);

module.exports = router;

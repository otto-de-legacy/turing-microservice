const errorController = require(require('path').join(__dirname, '..', 'controllers', 'errorController'));
const router = require('express').Router();

router.use(errorController.notFound);

module.exports = router;

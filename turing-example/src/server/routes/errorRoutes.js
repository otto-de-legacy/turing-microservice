'use strict';

const router = require('express').Router();
const errorController = require('../controller/errorController');

router.use(errorController.notFound);

module.exports = router;

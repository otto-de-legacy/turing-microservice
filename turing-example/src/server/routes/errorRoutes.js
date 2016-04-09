'use strict';

const errorController = require('../controller/errorController');
const router = require('express').Router();

router.use(errorController.notFound);

module.exports = router;

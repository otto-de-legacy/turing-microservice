'use strict';

const publicController = require('../../controller/public/publicController');
const router = require('express').Router();

router.get('/', publicController.index);

module.exports = router;

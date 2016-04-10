'use strict';

const router = require('express').Router();
const publicController = require('../../controller/public/publicController');

router.get('/', publicController.index);

module.exports = router;

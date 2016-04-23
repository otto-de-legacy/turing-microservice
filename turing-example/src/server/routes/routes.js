'use strict';

const router = require('express').Router();
const config = require('turing-config');
const status = require('turing-status');

router.use(config.get('turing-example:server:routes:root'), require('./public/publicRoutes'));
router.use(`${config.get('turing-example:server:routes:root')}/api`, require('./api/apiRoutes'));
router.use(require('turing-health'));
router.use(status);

router.get(`${config.get('turing-example:server:routes:root')}/api/status/:status`, (reqest, response) => {
  status.addStatusDetail('toll', {status: reqest.params.status});
  response.end();
});

router.use(require('./errorRoutes'));

module.exports = router;

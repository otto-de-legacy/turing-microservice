'use strict';

const router = require('express').Router();
const config = require('turing-config');

// TODO: Add diskusage information (look at edison health page for inspiration)
router.get(config.get('turing:server:routes:internal') + config.get('turing:health:route'), (request, response) => {
  response.json({
    status: 'UP',
    application: {
      status: 'UP'
    }
  });
});

module.exports = router;

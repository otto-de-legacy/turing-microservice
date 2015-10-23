const statusService = require(require('path').join(__dirname, '..', '..', 'services', 'internal', 'statusService'));

module.exports = (() => {
  'use strict';

  function health(request, response) {
    response.end();
  }

  function status(request, response) {
    response.json(statusService.getStatus());
  }

  return {
    health,
    status
  };
})();

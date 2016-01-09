const statusService = require('../../services/internal/statusService');

module.exports = (() => {
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

import statusService from '../../service/internal/statusService';

export default (() => {
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

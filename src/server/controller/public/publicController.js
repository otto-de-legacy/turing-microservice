const config = require('../../../../resources/server/config');

module.exports = (() => {
  function index(request, response) {
    response.render('index', {
      title: 'turing-microservice',
      rootPath: config.rootPath
    });
  }

  return {
    index
  };
})();

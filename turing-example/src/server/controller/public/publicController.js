const config = require('config');

module.exports = (() => {
  function index(request, response) {
    response.render('index', {
      title: 'turing-example',
      rootPath: config.get('turing-example:server:routes:root')
    });
  }

  return {
    index
  };
})();

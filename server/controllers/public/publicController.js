module.exports = (() => {
  'use strict';

  function index(request, response) {
    response.render('index', {title: 'turing-microservice'});
  }

  return {
    index
  };
})();

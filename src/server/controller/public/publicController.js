module.exports = (() => {
  function index(request, response) {
    response.render('index', {title: 'turing-microservice'});
  }

  return {
    index
  };
})();

module.exports = (() => {
  function index(request, response) {
    response.render('index', {title: 'turing-microservice'});
  }

  function react(request, response) {
    response.render('react', {title: 'React'});
  }

  return {
    index,
    react
  };
})();

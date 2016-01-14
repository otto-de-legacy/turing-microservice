export default (() => {
  function index(request, response) {
    response.render('index', {title: 'turing-microservice'});
  }

  return {
    index
  };
})();

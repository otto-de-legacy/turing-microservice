module.exports = (() => {
  function notFound(request, response, next) {
    response.set('Surrogate-Control', 'max-age=60');
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  }

  return {
    notFound
  };
})();

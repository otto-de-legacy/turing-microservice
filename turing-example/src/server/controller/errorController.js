'use strict';

module.exports = (() => {
  function notFound(request, response, next) {
    response.set('Surrogate-Control', 'max-age=60');
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  }

  return {
    notFound
  };
})();

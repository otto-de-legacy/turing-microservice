module.exports = (() => {
  'use strict';

  function notFound(request, response, next) {
    response.set('Surrogate-Control', 'max-age=60');
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  }

  function error(err, request, response) {
    response.status(err.status || 500).end();
  }

  return {
    notFound,
    error
  };
})();

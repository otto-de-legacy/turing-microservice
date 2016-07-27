'use strict';

module.exports = (() => {
  const scoring = {
    OK: 0,
    WARNING: 1,
    ERROR: 2
  };

  const statuses = [
    'OK',
    'WARNING',
    'ERROR'
  ];

  return {
    scoring,
    statuses
  };
})();

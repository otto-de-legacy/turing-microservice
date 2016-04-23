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

  function getScore(status) {
    return scoring[status.toUpperCase()];
  }

  function reduceToWorstScore(reducedScore, statusDetail) {
    return Math.max(reducedScore, getScore(statusDetail.status));
  }

  function getAggregatedStatus(statusDetails) {
    const worstScore = Object.keys(statusDetails)
      .reduce((reducedScore, statusDetailKey) => reduceToWorstScore(reducedScore, statusDetails[statusDetailKey]), 0);
    return statuses[worstScore];
  }

  return {
    getAggregatedStatus
  };
})();

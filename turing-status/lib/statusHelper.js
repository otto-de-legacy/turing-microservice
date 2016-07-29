'use strict';

const statusObject = require('./statusObject');

module.exports = (() => {
  function getScore(status) {
    return statusObject.scoring[status.toUpperCase()];
  }

  function reduceToWorstScore(reducedScore, statusDetail) {
    return Math.max(reducedScore, getScore(statusDetail.status));
  }

  function getAggregatedStatus(statusDetails) {
    const worstScore = Object.keys(statusDetails)
      .reduce((reducedScore, statusDetailKey) => {
        return reduceToWorstScore(reducedScore, statusDetails[statusDetailKey]);
      }, 0);
    return statusObject.statuses[worstScore];
  }

  return {
    getAggregatedStatus
  };
})();

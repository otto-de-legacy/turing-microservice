'use strict';

const Status = require('./status');

function score(scoring, status) {
  return scoring[status.toUpperCase()];
}

function reduceToWorstScore(reducedScore, scoring, statusDetail) {
  return Math.max(reducedScore, score(scoring, statusDetail.status));
}

class StatusHelper {
  constructor() {
    this.status = new Status();
  }

  getAggregatedStatus(statusDetails) {
    const worstScore = Object.keys(statusDetails)
      .reduce((reducedScore, statusDetailKey) => {
        return reduceToWorstScore(reducedScore, this.status.scoring, statusDetails[statusDetailKey]);
      }, 0);
    return this.status.statuses[worstScore];
  }
}

module.exports = StatusHelper;

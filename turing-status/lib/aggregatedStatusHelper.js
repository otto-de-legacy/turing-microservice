module.exports = (() => {
    const scoring = {
        OK: 0,
        WARNING: 1,
        ERROR: 2
    };

    const statuses = [
        {
            status: 'OK',
            message: 'all ok'
        },
        {
            status: 'WARNING',
            message: 'at least one warning'
        },
        {
            status: 'ERROR',
            message: 'at least one error'
        }
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

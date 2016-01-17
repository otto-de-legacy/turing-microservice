import {expect} from 'chai';

import aggregatedStatusHelper from '../../../src/server/helper/aggregatedStatusHelper';

describe('aggregatedStatusHelper', () => {
  it('expect to get aggregated status ok for empty status details', () => {
    // given
    const statusDetails = {};

    // when
    const aggretedStatus = aggregatedStatusHelper.getAggregatedStatus(statusDetails);

    // then
    expect(aggretedStatus.status).to.equal('OK');
    expect(aggretedStatus.message).to.equal('all ok');
  });

  it('expect to get aggregated status ok for status details with only ok', () => {
    // given
    const statusDetails = {
      one: {
        status: 'OK',
        message: 'OK'
      },
      two: {
        status: 'OK',
        message: 'OK'
      }
    };

    // when
    const aggretedStatus = aggregatedStatusHelper.getAggregatedStatus(statusDetails);

    // then
    expect(aggretedStatus.status).to.equal('OK');
    expect(aggretedStatus.message).to.equal('all ok');
  });

  it('expect to get aggregated status warning for status details with at least one warning and no error', () => {
    // given
    const statusDetails = {
      one: {
        status: 'OK',
        message: 'OK'
      },
      two: {
        status: 'WARNING',
        message: 'WARNING'
      }
    };

    // when
    const aggretedStatus = aggregatedStatusHelper.getAggregatedStatus(statusDetails);

    // then
    expect(aggretedStatus.status).to.equal('WARNING');
    expect(aggretedStatus.message).to.equal('at least one warning');
  });

  it('expect to get aggregated status error for status details with at least one error', () => {
    // given
    const statusDetails = {
      one: {
        status: 'OK',
        message: 'OK'
      },
      two: {
        status: 'ERROR',
        message: 'ERROR'
      },
      three: {
        status: 'WARNING',
        message: 'WARNING'
      }
    };

    // when
    const aggretedStatus = aggregatedStatusHelper.getAggregatedStatus(statusDetails);

    // then
    expect(aggretedStatus.status).to.equal('ERROR');
    expect(aggretedStatus.message).to.equal('at least one error');
  });

  it('expect to get aggregated status error for case insensitiv status details with at least one error', () => {
    // given
    const statusDetails = {
      one: {
        status: 'OK',
        message: 'OK'
      },
      two: {
        status: 'error',
        message: 'error'
      },
      three: {
        status: 'WARNING',
        message: 'WARNING'
      }
    };

    // when
    const aggretedStatus = aggregatedStatusHelper.getAggregatedStatus(statusDetails);

    // then
    expect(aggretedStatus.status).to.equal('ERROR');
    expect(aggretedStatus.message).to.equal('at least one error');
  });
});

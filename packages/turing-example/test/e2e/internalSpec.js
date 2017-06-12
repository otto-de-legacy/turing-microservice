'use strict';

const status = require('./steps/internalStatus');

describe('internal sites', () => {
  beforeAll(() => {
    browser.ignoreSynchronization = true;
  });

  it('status is ok', () => {
    status.statusIsOk();
  });
});

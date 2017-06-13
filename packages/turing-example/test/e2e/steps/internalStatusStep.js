'use strict';

const page = require('../pageObjects/interalStatusPage');

class InternalStatusStep {
  static statusIsOk() {
    page.get();

    expect(page.getText()).toContain('status: OK');
  }
}

module.exports = InternalStatusStep;

'use strict';

const page = require('../pageObjects/interalStatus');

class InternalStatusSteps {
  static statusIsOk() {
    page.get();

    expect(page.getText()).toContain('status: OK');
  }
}

module.exports = InternalStatusSteps;

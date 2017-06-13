'use strict';

const url = '/turing-example/internal/status';
const statusElement = '.status';

class InternalStatusPage {
  static get() {
    browser.get(url);
  }

  static getText() {
    return $(statusElement).getText();
  }
}

module.exports = InternalStatusPage;

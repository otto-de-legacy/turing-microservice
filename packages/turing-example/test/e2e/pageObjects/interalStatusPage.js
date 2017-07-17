'use strict';

const url = '/turing-example/internal/status';
const statusElement = '.status';

class InternalStatusPage {
  static visit() {
    browser.get(url);
  }

  static getText() {
    return $(statusElement).getText();
  }
}

module.exports = InternalStatusPage;

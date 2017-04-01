'use strict';

const {expect} = require('chai');

describe('example', () => {
  it('expect to have correct title', () => {
    browser.url('http://www.google.com');

    const title = browser.getTitle();
    expect(title).toBe('Google');
  });
});

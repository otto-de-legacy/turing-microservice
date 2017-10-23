'use strict';

module.exports = {
  extends: [
    '@commitlint/config-angular',
    '@commitlint/config-lerna-scopes'
  ],
  rules: {
    'scope-empty': [
      2,
      'never'
    ]
  }
};

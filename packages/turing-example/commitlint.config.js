/* eslint-disable max-lines */

'use strict';

module.exports = {
  rules: {
    'body-leading-blank': [
      2,
      'always'
    ],
    'body-max-length': [
      2,
      'always',
      Infinity
    ],
    'body-min-length': [
      2,
      'always',
      0
    ],
    'body-tense': [
      2,
      'always',
      ['present-imperative']
    ],
    'footer-leading-blank': [
      2,
      'always'
    ],
    'footer-max-length': [
      2,
      'always',
      Infinity
    ],
    'footer-min-length': [
      2,
      'always',
      0
    ],
    'footer-tense': [
      2,
      'always',
      ['present-imperative']
    ],
    'header-max-length': [
      2,
      'always',
      72
    ],
    'header-min-length': [
      2,
      'always',
      0
    ],
    lang: [
      0,
      'always',
      'eng'
    ],
    'scope-case': [
      2,
      'always',
      'lowerCase'
    ],
    'scope-max-length': [
      2,
      'always',
      Infinity
    ],
    'scope-min-length': [
      2,
      'always',
      0
    ],
    'subject-case': [
      2,
      'always',
      'lower-case'
    ],
    'subject-empty': [
      2,
      'never'
    ],
    'subject-full-stop': [
      2,
      'never',
      '.'
    ],
    'subject-max-length': [
      2,
      'always',
      Infinity
    ],
    'subject-min-length': [
      2,
      'always',
      0
    ],
    'subject-tense': [
      2,
      'always',
      ['present-imperative']
    ],
    'type-case': [
      2,
      'always',
      'lower-case'
    ],
    'type-empty': [
      2,
      'never'
    ],
    'type-max-length': [
      2,
      'always',
      Infinity
    ],
    'type-min-length': [
      2,
      'always',
      0
    ],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test'
      ]
    ]
  }
};
